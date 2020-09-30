const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/admin/*",
    createProxyMiddleware({
      target: "http://tamarock-api:5000",
      changeOrigin: true,
    })
  );
};
