module.exports = {
  transpileDependencies: [
    "vuetify"
  ],
  devServer: {
    port: 8081,
    proxy: {
      '^/requests': {
        target: 'http://127.0.0.1:8080',
        // ws: true,
        changeOrigin: true
      }
    }
  }
}