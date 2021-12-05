const path = require('path')
const utils = require('./utils')

const CONFIG = require('../CONFIG.json')

const REPOSITORIES_IMPLMEMENTING_APIS = path.join(
  __dirname,
  '../',
  CONFIG["data-path"],
  '/repositories-implementing-api-evolutions.json'
)

/*
 *  ================ UTILITY FUNCTIONS ====================
 */

function repositoriesWhereAllVersionsAreFoundInTheSameCommit (
  repositoryInformation
) {
  const commitsForEachVersion = Object.values(
    repositoryInformation.commitsPerVersion
  )

  const firstValue = commitsForEachVersion[0]

  const keep = commitsForEachVersion.every(value =>
    utils.equalsArray(value, firstValue)
  )

  if (!keep) {
    console.log(`Filter repo ${repositoryInformation.repositoryName}`)
  }

  return keep
}

function notOnlyOneCommit (repositoryInformation) {
  return (
    new Set(
      Object.values(repositoryInformation.commitsPerVersion).flatMap(
        v => v.commits
      )
    ).size > 1
  )
}

function notOnlyOneVersionWithCommits (repositoryInformation) {
  return (
    Object.values(repositoryInformation.commitsPerVersion)
      .map(value => value.commits.length)
      .filter(count => count > 0).length > 1
  )
}

function perTotalMatchAndMatchOverVersionsRatio (a, b) {
  const aScore =
    a.totalMatch + a.totalMatch / Object.values(a.commitsPerVersion).length
  const bScore =
    b.totalMatch + b.totalMatch / Object.values(b.commitsPerVersion).length
  return bScore - aScore
}

/*
 *  ================ SCRIPT STATEMENTS ====================
 */

function getRepositoriesToLookAt () {
  const data = utils.getCachedFile(REPOSITORIES_IMPLMEMENTING_APIS)

  if (data === null) {
    console.error('Can not find the data. Please run the main script first.')
  }

  const repositoriesToLookAt = (
    data
      .flatMap(api =>
        api.reposUsingApi.map(entry => {
          entry.apiId = api.apiId
          entry.apiDescription = api.apiDescription
          return entry
        })
      )
      // .filter(repositoriesWhereAllVersionsAreFoundInTheSameCommit)
      .filter(notOnlyOneCommit)
      .filter(notOnlyOneVersionWithCommits)
      .sort(perTotalMatchAndMatchOverVersionsRatio)
  )

  console.log(
    `✅ You have to manually analyze ${repositoriesToLookAt.length} repositories for API changes. Good luck. You'll find all the results in the repositories-to-look-at.json file`
  )
  
  utils.cacheFile(
    path.join(__dirname, '/../repositories-to-look-at.json'),
    repositoriesToLookAt
  )

}

module.exports = {
  getRepositoriesToLookAt
}
