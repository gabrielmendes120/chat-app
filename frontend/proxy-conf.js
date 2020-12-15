const PROXY_CONFIG = [
    {
      // Tudo que for /api entende que é uma chamada ao backend
      context: ['/api'],
      target: ' ', // Url de produção
      secure: false, // Se for https = true
      logLevel: 'debug', //Nivel do log
      pathRewrite: { '^/api': '' }, // vai apagar o /api da request,
      changeOrigin: true,
      router: { // Qualquer outro que não seja de produção
        "localhost:4200" : "http://localhost:3000/",
      }
    },
  ];
  
  module.exports = PROXY_CONFIG;
  