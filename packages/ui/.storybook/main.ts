import type { StorybookConfig } from '@storybook/react-vite'

import { join, dirname, resolve } from 'path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // Speeds up Storybook build time
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      // Makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // Makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => {
        return prop.parent
          ? !/node_modules\/(.pnpm)?\/(?!react-bootstrap)/.test(prop.parent.fileName)
          : true
      },
    },
  },
  async viteFinal(config) {
    if (!config.resolve?.alias) return config

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve(__dirname, '../@'),
    }
    return config
  },
  // webpackFinal: async (config) => {
  //   if (config.resolve) {
  //     config.resolve.plugins = [
  //       ...(config.resolve.plugins || []),
  //       new TsconfigPathsPlugin({
  //         configFile: path.resolve(__dirname, '../tsconfig.json'),
  //       }),
  //     ];
  //     config.resolve.alias = {
  //       ...config.resolve.alias,
  //       '@/public/icons': path.resolve(__dirname, '../public/icons'),
  //     };
  //   }
  //   return config;
  // },
}
export default config
