module.exports = {
  lintOnSave: false,
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // target host
        // ws: true,  // proxy websockets
        changeOrigin: true,  // needed for virtual hosted sites
        pathRewrite: {
          '^/api': ''  // rewrite path
        }
      },
    },  // 配置多个代理
  }
};
