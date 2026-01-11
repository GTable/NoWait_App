module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@emotion/babel-plugin",
      "inline-dotenv",
      "react-native-reanimated/plugin",
    ],
  };
};
