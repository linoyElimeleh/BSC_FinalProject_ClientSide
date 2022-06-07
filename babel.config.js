module.exports = function(api) {
  api.cache(true);
  return {
    plugins: [
      "@babel/plugin-proposal-optional-chaining"
    ],
    presets: ['babel-preset-expo'],
  };
};
