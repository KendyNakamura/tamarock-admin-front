const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/admin/*",
    createProxyMiddleware({
      // target: "http://tamarock-api:5000",
      target: "http://tamarock-lb-1506610018.ap-northeast-1.elb.amazonaws.com",
      changeOrigin: true,
    })
  );
};
