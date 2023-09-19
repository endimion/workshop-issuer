const withCSS = require("@zeit/next-css");
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const webpack = require("webpack");
const path = require("path");
const constants = require("./utils/consts");
const imageConfig = withImages();
require("dotenv").config();

const rewrites = () => {
  return [
    {
      source: "/workshop-issuer",
      destination: "/",
    },
  ];
};

module.exports = withPlugins([[withImages]], {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },
  basePath: process.env.BASE_PATH ? `/${process.env.BASE_PATH}` : "",
  env: {
    GATACA_APP: "1cf86bff-37aa-4d2d-a6fb-e3bf11e14fcd",
    GATACA_PASS: "7XitxGX1gxjfG2wFDJaP3u18uTFm47AomcQzKs3YVUDY",
    EMAIL_USER: "eidapps@atlantis-group.gr",
    EMAIL_PASS: "d82c4f11d3",
    OIDC_CLIENT: "erua-issuer",
    OIDC_CLIENT_SECRET: "TXTBJVXwWvZvEOuoxC4yRF6srcUtd0Ho",
  },
  //   async rewrites() {
  //     return rewrites();
  //   },
});
