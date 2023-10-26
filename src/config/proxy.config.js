const env = process.env.NODE_ENV
module.exports = {
  '/api/*': {
    target: process.env.NODE_ENV==='development'?'https://test-h5.timingbio.com':'/' // 代理接口
  }
}
