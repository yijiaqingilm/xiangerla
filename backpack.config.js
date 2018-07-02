var path = require('path')

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/index.js'
    config.resolve.alias = {
      'server': path.resolve(__dirname, './server')
    }
    return config
  }
}
