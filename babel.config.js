module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'], // Ton dossier source
          alias: {
            '@store': './src/store',
            '@services': './src/services',
            '@components': './src/components',
            '@features': './src/features',
            '@db': './src/db',
			'@utils': './src/utils',
          },
        },
      ],
    ],
  };
};