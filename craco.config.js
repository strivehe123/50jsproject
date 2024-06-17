const path = require('path')

const resolve = (pathname) => path.resolve(__dirname, pathname)
module.exports = {
  plugins: [],
  webpack: {
    alias: {
      '@': resolve('src'),
      component: resolve('src/components'),
      util: resolve('src/utils')
    }
  }
}
