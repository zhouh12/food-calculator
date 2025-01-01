/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['@core/ui'],
  //productionBrowserSourceMaps: true,
  webpack(config, { dev, isServer }) {
    if (dev && !isServer) {
      //config.devtool = 'source-map'
    }
    return config
  },
}

// const path = require('path');

// const nextConfig = {
//   webpack: (config) => {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       '@': path.resolve(__dirname, './'),
//       'src': path.resolve(__dirname, './src'),
//     };

//     return config;
//   },
// };

// module.exports = nextConfig;
