/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
const webpack = require('webpack');
const path = require('path');
require('dotenv').config();

function mapEnvVariable (data) {
  const prefix = 'APP_ENV_';
  const keys = Object.keys(data).filter((i) => i.indexOf(prefix) === 0);
  const result = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    result[key.replace(prefix, '')] = data[key];
  }

  // NODE ENV
  result.NODE_ENV = process.env.NODE_ENV || 'production';

  return result;
}
// these props are both optional
export default {
  // you can add preact-cli plugins here
  plugins: [],
  /**
	 * Function that mutates the original webpack config.
	 * Supports asynchronous changes when a promise is returned (or it's an async function).
	 *
	 * @param {object} config - original webpack config.
	 * @param {object} env - options passed to the CLI.
	 * @param {WebpackConfigHelpers} helpers - object with useful helpers for working with the webpack config.
	 * @param {object} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
	 */
  // eslint-disable-next-line no-unused-vars
  webpack (config, env, helpers, options) {
    /** you can change the config here */
    const projectPath = '';

    // build platform
    let buildPlatform = '';
    if (
      config.output.path.split('build/').length > 1 &&
			config.output.path.split('/ssr-build').length === 1
    ) {
      // eslint-disable-next-line prefer-destructuring
      buildPlatform = config.output.path.split('build/')[1];

      if (config.output.publicPath !== undefined) {
        config.output.publicPath = `/${projectPath}${buildPlatform}/`;
      }
    }

    // logs
    config.stats = true;

    // worker loader
    config.module.rules.push({
      test: path.join(__dirname, 'src/workers'),
      use: {
        loader: 'worker-loader',
        options: {
          fallback: true
        }
      }
    });

    // Add env plugins
    const envVariables = mapEnvVariable(process.env);
    envVariables.PLATFORM = buildPlatform || envVariables.PLATFORM;
    envVariables.PUBLIC_PATH = buildPlatform
      ? `${projectPath}${buildPlatform}/`
      : '';
    // Add PWA Config
    /* eslint-disable global-require */
    envVariables.CONFIG = require('./jobs/config/pwa-config.json');
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(envVariables)
      })
    );

    // add alias
    config.resolve.alias = {
      ...config.resolve.alias,
      _unistore: path.resolve(__dirname, 'src/unistore'),
      _routes: path.resolve(__dirname, 'src/routes'),
      _components: path.resolve(__dirname, 'src/components'),
      _mutations: path.resolve(__dirname, 'src/mutations'),
      _helpers: path.resolve(__dirname, 'src/helpers'),
      _workers: path.resolve(__dirname, 'src/workers'),
      _platform: path.resolve(__dirname, `src/_${envVariables.PLATFORM}`),
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    };
  }
};
