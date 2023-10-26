const path = require('path')
const proxy = require('./src/config/proxy.config') // 代理配置
module.exports = {
  assetsDir: 'static',
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'all',
    proxy
  },
  // 是否生成映射文件
  productionSourceMap: false,
  lintOnSave: false
}
