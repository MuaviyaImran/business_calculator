const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/rest",
    createProxyMiddleware({
      target: "http://www.calcxml.com",
      changeOrigin: true,
    })
  );
};
