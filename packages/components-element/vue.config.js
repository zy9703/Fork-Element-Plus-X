module.exports = {
  devServer: {
    proxy: {
      '/ollama': {
        target: 'https://ollama.com',
        changeOrigin: true,
        pathRewrite: {
          '^/ollama': ''
        }
      }
    }
  }
}
