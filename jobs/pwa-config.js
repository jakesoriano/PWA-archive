/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// config data
const pwaConfig = {
  platform: 'W88 Mobile',
  os: 'Boilerplate',
  stage: 'UAT'
};

exports.getNativeConfig = async (url, params) => {
  // fetch data
  const response = await axios(url, {
    method: 'GET',
    params
  });
  return response.data.length > 0 ? response.data[0].injectConfig : {};
};

exports.generateJson = (jsonFile, configData) => {
  fs.writeFileSync(
    path.join(__dirname, `./${jsonFile}`),
    JSON.stringify(configData)
  );
};

// init
exports.init = async () => {
  console.log('----- ===== [ Start Generating PWA Config ===== ----- \n');

  // @ variables
  const params = {
    platform: process.env.STRAPI_PLATFORM || pwaConfig.platform,
    os: process.env.STRAPI_OS || pwaConfig.os,
    stage: (process.env.CI_COMMIT_REF_NAME || pwaConfig.stage).replace('-', '')
  };
  console.log(`1. Variables: ${JSON.stringify(params)}`);

  // @ get pwa config
  console.log('2. Fetch PWA Config');
  const url = `${process.env.STRAPI_URL}/pwaconfigs`;
  const resData = await this.getNativeConfig(url, params);

  // @ generate json file
  const jsonFile = 'config/pwa-config.json';
  console.log(`3. Generate JSON File: ${jsonFile}`);
  this.generateJson(jsonFile, resData);

  console.log('\n');
  console.log('----- ===== [ End Generating PWA Config ===== ----- \n');
};

this.init();
