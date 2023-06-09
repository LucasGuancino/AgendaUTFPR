module.exports = function (api) {
  api.cache(true);

  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = ['@babel/plugin-transform-flow-strip-types'];

  return {
    presets,
    plugins,
  };
};
