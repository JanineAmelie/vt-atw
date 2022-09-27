/* config-overrides.js */
/* eslint-disable*/

module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\\.(png|jp(e*)g|svg|gif)$/,
    loader: "file-loader"
  });
  return config;
};
