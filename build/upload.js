const OSS = require('ali-oss')
const fs = require('fs')
const path = require('path')

const ossConfig = require('../app.config').oss

const {
  region, accessKeyId, accessKeySecret, bucket
} = ossConfig

const client = new OSS.Wrapper({
  region, accessKeyId, accessKeySecret, bucket
})

const doUpload = (key, file) => {
  return new Promise((resolve, reject) => {
    client.put(key, file)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const distPath = path.join(__dirname, '../dist')

const uploadAll = (dir, prefix) => {
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const key = prefix ? `${prefix}/${file}` : file
    if (fs.lstatSync(filePath).isDirectory()) {
      return uploadAll(filePath, key)
    }
    doUpload(key, filePath)
      .then(resp => console.log(resp))
      .catch(err => console.error(err))
  })
}

uploadAll(distPath)
