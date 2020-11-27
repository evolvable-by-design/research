const fs = require('fs')
const shell = require('shelljs')

async function withResultCaching (cachingFilePath, fct) {
  const maybeAlreadyComputedResult = getCachedFile(cachingFilePath)

  if (maybeAlreadyComputedResult !== null) {
    return maybeAlreadyComputedResult
  } else {
    const results = await fct()
    cacheFile(cachingFilePath, results)

    return results
  }
}

function createDirectoryIfNotExist (dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }
}

function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

function mergeObjects (obj1, obj2) {
  const result = Object.assign({}, obj1)
  for ([key, value] of Object.entries(obj2)) {
    result[key] = value
  }
  return result
}

const reduceObject = reduceObjectMapValues(value => value)

function reduceObjectMapValues (mapper) {
  return (acc, entry) => {
    acc[entry[0]] = mapper(entry[1])
    return acc
  }
}

function getCachedFile (filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    return null
  }
}

function max (a, b) {
  return a > b ? a : b
}

function min (a, b) {
  return a > b ? b : a
}

function equalsArray (a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  )
}

function cacheFile (filePath, content) {
  fs.writeFile(filePath, JSON.stringify(content), 'utf-8', () => {})
}

class RateLimitHandler {
  constructor (limit, timeToWaitInSeconds, initialCounter, beforeWait) {
    this.limit = limit
    this.timeToWaitInSeconds = timeToWaitInSeconds
    this.counter = initialCounter || 0
    this.beforeWait = beforeWait
  }

  async plusOne () {
    this.counter += 1

    if (this.counter % this.limit === 0) {
      if (this.beforeWait !== undefined) {
        this.beforeWait()
      }
      await sleep(this.timeToWaitInSeconds * 1000)
    }
  }
}

function cloneRepository (url, absolutePath) {
  console.log(`⌛️ Cloning repo ${url} into ${absolutePath} ...`)
  shell.cd(absolutePath)
  shell.exec(`git clone ${url}`)
  console.log('✅ Done.')
}

const BACKSLASH_HEX_CODE = '%09'

function listCommitsWithText (dirPath, text) {
  console.log(`Searching for ${text} in ${dirPath}`)
  shell.cd(dirPath)
  const result = shell.exec(`git log --source -S '${text}' --all`)
  const commits = result.stdout
    .split('commit')
    .map(s => s.trim())
    .filter(s => s !== '')
    .map(encodeURI)
    .map(s => s.substring(0, s.indexOf(BACKSLASH_HEX_CODE)))
  return commits
}

module.exports = {
  createDirectoryIfNotExist,
  sleep,
  mergeObjects,
  reduceObject,
  reduceObjectMapValues,
  getCachedFile,
  cacheFile,
  withResultCaching,
  max,
  min,
  RateLimitHandler,
  cloneRepository,
  listCommitsWithText,
  equalsArray
}
