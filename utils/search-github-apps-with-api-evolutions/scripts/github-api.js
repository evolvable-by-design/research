const axios = require('axios')
const md5 = require('md5')
const path = require('path')

const {
  withResultCaching,
  mergeObjects,
  reduceObjectMapValues,
  getCachedFile,
  cacheFile,
  min,
  RateLimitHandler
} = require('./utils')

const CONFIG = require('../CONFIG.json')

const GITHUB_AUTH_TOKEN = '6b32011b42d18b47823a863402157c894ddd39ad'
const GITHUB_SEARCH_API_RATE_LIMIT = 30
const GITHUB_SEARCH_API_RATE_LIMIT_RESET_DURATION = 60 // one minute in seconds
const GITHUB_REPOSITORY_USING_APIS_COUNT_FILE_PATH_UNCOMPLETE = path.join(
  __dirname,
  '/data/cache/github-search-usage-count-'
)
const MAX_REPO_RETURNED_BY_SEARCH_API = 100

async function getGithubRepositoriesUsageCount (apis) {
  const hash = md5(JSON.stringify(apis))
  const CACHE_FILE_PATH =
    GITHUB_REPOSITORY_USING_APIS_COUNT_FILE_PATH_UNCOMPLETE + hash + '.json'
  const IN_PROGRESS_RESULTS_FILE_PATH =
    GITHUB_REPOSITORY_USING_APIS_COUNT_FILE_PATH_UNCOMPLETE +
    hash +
    '.temp.json'

  return await withResultCaching(CACHE_FILE_PATH, async () => {
    const CACHE_RESULTS_EVERY_N_CALLS = GITHUB_SEARCH_API_RATE_LIMIT

    const alreadyComputedResults =
      getCachedFile(IN_PROGRESS_RESULTS_FILE_PATH) || {}

    const apisName = apis.filter(
      apiName => !Object.keys(alreadyComputedResults).includes(apiName)
    )

    let resultsNotCachedYet = {}

    for (const i in apisName) {
      const apiName = apisName[i]
      const result = await _searchGithubRepositories(apiName, 1, 1)
      console.log(
        `🙋‍♂️ The API ${apiName} is used by ${result['total_count']} repositories`
      )
      await GITHUB_SEARCH_API_LIMIT_RATE_HANDLER.plusOne()

      resultsNotCachedYet[apiName] = result

      if (i % CACHE_RESULTS_EVERY_N_CALLS === 0) {
        const previousResults =
          getCachedFile(IN_PROGRESS_RESULTS_FILE_PATH) || {}
        const completeResults = mergeObjects(
          previousResults,
          resultsNotCachedYet
        )
        cacheFile(IN_PROGRESS_RESULTS_FILE_PATH, completeResults)
        resultsNotCachedYet = {}
      }
    }

    const githubResults = getCachedFile(IN_PROGRESS_RESULTS_FILE_PATH)
    return Object.entries(githubResults).reduce(
      reduceObjectMapValues(githubResponse => githubResponse['total_count']),
      {}
    )
  })
}

async function getReposUsingApi (
  apiName,
  maxRepositoriesListed,
  totalRepositoriesCount
) {
  const repositoriesToFetch = min(maxRepositoriesListed, totalRepositoriesCount)
  const callsToMake = Math.ceil(
    repositoriesToFetch / MAX_REPO_RETURNED_BY_SEARCH_API
  )
  const pageSize = min(repositoriesToFetch, MAX_REPO_RETURNED_BY_SEARCH_API)

  const results = {}

  for (let i = 1; i <= callsToMake; i++) {
    const page = await _searchGithubRepositories(apiName, pageSize, i)

    results['total_count'] = page['total_count']
    results['items'] = (results['items'] || []).concat(page.items)

    await GITHUB_SEARCH_API_LIMIT_RATE_HANDLER.plusOne()
  }

  return results
}

async function _searchGithubRepositories (apiName, pageSize, pageNumber) {
  try {
    const encodedName = encodeURI(apiName.replace('/', ''))

    const githubResponse = await axios.get(
      `https://api.github.com/search/repositories?q=${encodedName}+API+language:js&per_page=${pageSize ||
        1}&page=${pageNumber || 1}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${CONFIG['github-auth-token']}`
        }
      }
    )

    return githubResponse.data
  } catch (error) {
    _handleGithubError(error)
  }
}

function _handleGithubError (error) {
  if (error.response && error.response.data) {
    console.error(error.response.data)
  } else if (error.response) {
    console.error(error.response)
  } else {
    console.error(error)
  }
}

const GITHUB_SEARCH_API_LIMIT_RATE_HANDLER = new RateLimitHandler(
  GITHUB_SEARCH_API_RATE_LIMIT,
  GITHUB_SEARCH_API_RATE_LIMIT_RESET_DURATION,
  0,
  () =>
    console.log(
      '⌛ Waiting 1 minute for GitHub Search API rate limit to be reset...'
    )
)

module.exports = {
  getGithubRepositoriesUsageCount,
  getReposUsingApi
}
