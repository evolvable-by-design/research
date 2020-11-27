const path = require('path')
const fs = require('fs')

const {
  createDirectoryIfNotExist,
  reduceObject,
  reduceObjectMapValues,
  getCachedFile,
  cacheFile,
  withResultCaching,
  cloneRepository,
  listCommitsWithText
} = require('./scripts/utils')
const {
  getApisWithSeveralVersionsFromApiGuru,
  getApiUrlPerVersion
} = require('./scripts/api-guru')
const {
  getReposUsingApi,
  getGithubRepositoriesUsageCount
} = require('./scripts/github-api')
const { getRepositoriesToLookAt } = require('./scripts/results-analysis')

const CONFIG = require('./CONFIG.json')

const APIS_WITH_USAGE_COUNT_CACHED_FILE_PATH = path.join(
  __dirname,
  CONFIG["data-path"],
  '/cache/apis-with-usage-count.json'
)
const REPOSITORIES_PATH = path.join(__dirname, CONFIG["data-path"], '/repositories/')
const FILTERED_APIS_CACHED_FILE_PATH = path.join(
  __dirname,
  CONFIG["data-path"],
  '/cache/filtered-apis.json'
)
const APIS_WITH_ALL_REPO_CLONED_FILE_PATH = path.join(
  __dirname,
  CONFIG["data-path"],
  '/cache/apis-with-repo-cloned.json'
)
const REPOSITORIES_IMPLMEMENTING_APIS = path.join(
  __dirname,
  CONFIG["data-path"],
  '/repositories-implementing-api-evolutions.json'
)
const MAX_REPOSITORIES_FETCHED = CONFIG['max-repositories-fetched-per-api']

// ==========================================================
//                    MAIN SCRIPT FUNCTIONS
// ==========================================================

async function main () {
  console.log('⌛️ Gathering APIs with several versions from API Guru')

  const apisWithSeveralVersions = await getApisWithSeveralVersionsFromApiGuru()

  console.log(
    `✅ There are ${
      Object.keys(apisWithSeveralVersions).length
    } APIs with more than one version`
  )

  console.log(
    '⌛️ Filter APIs to keep the ones that are used in Github repositories'
  )

  const apisWithUsageCount = await addUsageCountToApis(apisWithSeveralVersions)

  const apisUsedInGithubRepositories = await filterApisUsedInGithubRepositories(
    apisWithUsageCount
  )

  const apisToGetReposFor = Object.entries(apisUsedInGithubRepositories)
    .filter(entry => entry[1]['githubRepositoriesUsageCount'] !== undefined)
    .reduce(reduceObject, {})

  console.log(
    `✅ There are ${
      Object.keys(apisToGetReposFor).length
    } APIs that are used in GitHub repositories.`
  )

  console.log(
    '⌛ Retrieving the repositories that announce to implement these APIs'
  )
  const sortedApisList = sortApisPerUsageAsc(apisToGetReposFor)
  await getRepositories(sortedApisList)

  console.log(
    `✅ Repositories cloned. Up to ${MAX_REPOSITORIES_FETCHED} have been fetched per API`
  )

  console.log('🔍 Looking for repositories that implement these APIs for real')

  const SHORT_LIST_TEMP = Object.entries(sortedApisList)
    //.slice(0, 10)
    .reduce(reduceObject, {})

  const reposThatReallyImplementsAPIs = await findRepositoriesReallyImplementsTheAPIs(
    SHORT_LIST_TEMP
  )

  const repoCount = reposThatReallyImplementsAPIs
    .map(api => api.reposUsingApi.length)
    .reduce((sum, nb) => sum + nb)

  console.log(
    `✅ There are ${repoCount} repositories that really implement the APIs.`
  )

  console.log('🔍 Looking for the repositories to analyse')
  getRepositoriesToLookAt()

  console.log('✅ End.')
}

async function getRepositories (apis) {
  const apisWithRepoCloned =
    getCachedFile(APIS_WITH_ALL_REPO_CLONED_FILE_PATH) || []

  for ([apiId, apiDescription] of Object.entries(apis)) {
    const apiName = getApiName(apiDescription)
    if (apisWithRepoCloned.includes(apiName)) {
      continue
    }

    await retrieveRepositoriesOfApi(apiId, apiDescription)

    apisWithRepoCloned.push(apiName)
    cacheFile(APIS_WITH_ALL_REPO_CLONED_FILE_PATH, apisWithRepoCloned)
  }
}

async function filterApisUsedInGithubRepositories (apisWithUsageCount) {
  return await withResultCaching(FILTERED_APIS_CACHED_FILE_PATH, async () => {
    return Object.entries(apisWithUsageCount)
      .filter(
        ([_, apiDescription]) =>
          apiDescription['githubRepositoriesUsageCount'] !== 0
      )
      .reduce(reduceObject, {})
  })
}

function getExecutionReportPath (apiId, apiDescription) {
  const apiDirectoryPath = getApiDirectoryPath(apiId, apiDescription)
  return apiDirectoryPath + '/execution-report.json'
}

async function retrieveRepositoriesOfApi (apiId, apiDescription) {
  const directoryPath = createApiDirectory(apiId, apiDescription)
  cacheFile(directoryPath + '/api-description.json', apiDescription)

  const EXECUTION_REPORT_PATH = getExecutionReportPath(apiId, apiDescription)
  const executionReport = createExecutionReport(
    apiDescription,
    EXECUTION_REPORT_PATH
  )

  const repositoriesList =
    executionReport.repositoriesList.length !== 0
      ? executionReport.repositoriesList
      : (
          await getReposUsingApi(
            getApiName(apiDescription),
            MAX_REPOSITORIES_FETCHED,
            apiDescription['githubRepositoriesUsageCount']
          )
        ).items.map(item => item['html_url'])

  executionReport.repositoriesList = repositoriesList
  cacheFile(EXECUTION_REPORT_PATH, executionReport)

  const repositoriesToFetch = min(
    apiDescription['githubRepositoriesUsageCount'],
    MAX_REPOSITORIES_FETCHED
  )

  for (
    let i = executionReport.repositoriesFetched;
    i < repositoriesToFetch;
    i++
  ) {
    const repositoryUrl = repositoriesList[i]
    cloneRepository(repositoryUrl, directoryPath)

    executionReport.repositoriesFetched = i + 1
    cacheFile(EXECUTION_REPORT_PATH, executionReport)
  }
}

async function findRepositoriesReallyImplementsTheAPIs (apis) {
  return await withResultCaching(REPOSITORIES_IMPLMEMENTING_APIS, async () => {
    const results = await Promise.allSettled(
      Object.entries(apis).map(async ([apiId, apiDescription]) => {
        const reposUsingApi = await findRepositoriesReallyImplementsTheApi(
          apiId,
          apiDescription
        )
        updateExecutionReportWithCommitUsingApi(
          apiId,
          apiDescription,
          reposUsingApi
        )

        return {
          apiId,
          apiDescription,
          reposUsingApi
        }
      })
    )

    const failingPromises = results.filter(
      promise => promise.status === 'rejected'
    )
    console.warn(
      'The following errors happened while searching for the repositories that really use the APIs'
    )
    console.warn(failingPromises.map(promise => promise.reason))

    return results
      .filter(promise => promise.status === 'fulfilled')
      .map(promise => promise.value)
      .filter(api => api.reposUsingApi.length > 0)
  })
}

async function findRepositoriesReallyImplementsTheApi (apiId, apiDescription) {
  const directoryPath = getApiDirectoryPath(apiId, apiDescription)

  const versionAndUrl = await getApiUrlPerVersion(apiDescription)

  // creates the api directory if not existing to avoid further errors. Should be refactored.
  if (!fs.existsSync(directoryPath)) {
    createApiDirectory(apiId, apiDescription)
  }

  const repos = fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  const reposUsingApi = repos
    .map(repo => {
      console.log(
        `ℹ️  Looking for the commits implementing the API ${apiId} in ${repo}`
      )

      const repoPath = path.join(directoryPath, repo)

      const commitsContainingVersions = Object.values(versionAndUrl)
        .map(({ version, url }) => [
          version,
          { url, commits: listCommitsWithText(repoPath, url) }
        ])
        .filter(([version, result]) => result.commits !== [])
        .reduce(reduceObject, {})

      const totalMatch = Object.values(commitsContainingVersions)
        .map(result => result.commits)
        .map(commits => commits.length)
        .reduce((acc, count) => acc + count, 0)

      console.log(
        `⚠️  Found ${totalMatch} commits implementing the API ${apiId} in ${repo}\n`
      )

      return {
        repositoryName: repo,
        repositoryPath: repoPath,
        totalMatch,
        commitsPerVersion: commitsContainingVersions
      }
    })
    .filter(info => info.totalMatch > 0)

  return reposUsingApi
}

function updateExecutionReportWithCommitUsingApi (
  apiId,
  apiDescription,
  reposUsingApi
) {
  const executionReportPath = getExecutionReportPath(apiId, apiDescription)
  const executionReport =
    getCachedFile(executionReportPath) ||
    createExecutionReport(apiDescription, executionReportPath)
  executionReport.reposUsingApi = reposUsingApi
  cacheFile(executionReportPath, executionReport)
}

// ==========================================================
//                    UTILITY FUNCTIONS
// ==========================================================

function createExecutionReport (apiDescription, filePath) {
  const cachedExecutionReport = getCachedFile(filePath) || {}

  const executionReport = {
    apiName: getApiName(apiDescription),
    apiDescriptionPath: './api-description.json',
    repositoriesFetched: cachedExecutionReport['repositoriesFetched'] || 0,
    maxRepositoriesFetched: MAX_REPOSITORIES_FETCHED,
    repositoriesList: []
  }

  return executionReport
}

/**
 *
 * @param {*} apis must be the object from ApiGuru
 */
async function addUsageCountToApis (apis) {
  return await withResultCaching(
    APIS_WITH_USAGE_COUNT_CACHED_FILE_PATH,
    async () => {
      const apisName = Object.values(apis).map(api => getApiName(api))
      const usages = await getGithubRepositoriesUsageCount(apisName)

      const apisWithUsageCount = Object.entries(apis).reduce(
        reduceObjectMapValues(apiDescription => {
          apiDescription['githubRepositoriesUsageCount'] =
            usages[getApiName(apiDescription)]
          return apiDescription
        }),
        {}
      )

      return apisWithUsageCount
    }
  )
}

/**
 *
 * @param {*} apis must be the object from ApiGuru completed with the usage count using addUsageCountToApiDesc(apis)
 */
function sortApisPerUsageAsc (apis) {
  return Object.entries(apis)
    .sort((apiA, apiB) => {
      const apiAUsage = apiA[1]['githubRepositoriesUsageCount'] || 0
      const apiBUsage = apiB[1]['githubRepositoriesUsageCount'] || 0
      return apiAUsage - apiBUsage
    })
    .reduce(reduceObject, {})
}

function apiWithUsageCount (apis) {
  return Object.entries(apis).reduce(
    reduceObjectMapValues(
      apiDescription => apiDescription.githubRepositoriesUsageCount
    ),
    {}
  )
}

function getApiName (api) {
  return api.versions[api.preferred].info.title
}

function createApiDirectory (apiId, apiDescription) {
  createDirectoryIfNotExist(REPOSITORIES_PATH)

  const directoryPath = getApiDirectoryPath(apiId, apiDescription)
  createDirectoryIfNotExist(directoryPath)
  return directoryPath
}

function getApiDirectoryPath (apiId, apiDescription) {
  return (
    REPOSITORIES_PATH +
    apiDescription['githubRepositoriesUsageCount'] +
    '-' +
    apiId
  )
}

try {
  main()
} catch (error) {
  console.error(error)
}
