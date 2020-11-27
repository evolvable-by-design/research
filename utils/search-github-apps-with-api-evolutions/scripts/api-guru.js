const axios = require('axios')
const path = require('path')

const { getCachedFile, cacheFile } = require('./utils')

const ALL_APIS_CACHED_FILE_PATH = path.join(__dirname, '/data/cache/apis.json')

async function getApisWithSeveralVersionsFromApiGuru () {
  const maybeCachedFile = getCachedFile(ALL_APIS_CACHED_FILE_PATH)

  if (maybeCachedFile !== null) {
    return maybeCachedFile
  } else {
    const apiResponse = await axios.get('https://api.apis.guru/v2/list.json')
    const apis = apiResponse.data

    const apisWithSeveralVersions = Object.assign({}, apis)
    for ([url, api] of Object.entries(apisWithSeveralVersions)) {
      if (
        (api.versions instanceof Array && api.versions.length === 1) ||
        Object.keys(api.versions).length === 1
      ) {
        delete apisWithSeveralVersions[url]
      }
    }

    cacheFile(ALL_APIS_CACHED_FILE_PATH, apisWithSeveralVersions)

    return apisWithSeveralVersions
  }
}

async function getApiUrlPerVersion (apiDescription) {
  return await Promise.all(
    Object.entries(apiDescription.versions).map(
      async ([versionNumber, versionDescription]) => {
        const url = await _getApiUrl(versionDescription.swaggerUrl, 0)
        return { version: versionNumber, url }
      }
    )
  )
}

async function _getApiUrl (documentationUrl, retryCount) {
  try {
    const response = await axios.get(documentationUrl)
    const swaggerDoc = response.data
    return getUrl(swaggerDoc)
  } catch (error) {
    if (retryCount < 3) {
      return await _getApiUrl(documentationUrl, (retryCount || 0) + 1)
    } else {
      return 'not-url-found'
    }
  }
}

function getUrl (swaggerDoc) {
  return swaggerDoc['swagger'] !== undefined
    ? swaggerDoc.host + (swaggerDoc.basePath || '')
    : swaggerDoc.servers[0].url
}

module.exports = {
  getApisWithSeveralVersionsFromApiGuru,
  getApiUrlPerVersion
}
