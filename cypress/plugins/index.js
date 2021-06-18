
// <reference types="cypress" />


const fs = require('fs-extra');
const path = require('path');



function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('..', 'Desafio-QA-PicPay/cypress/config', `${file}.json`)
  return fs.readJSON(pathToConfigFile);
}

/**
 * @type {Cypress.PluginConfig}
 */


module.exports = (on, config) => {
  const file = config.env.configFile || 'hml'
 
  on("task", {
    dbQuery: (query) => require("cypress-postgres")(query.query, config.env.db)



  });


  on('before:browser:launch', (browser = {}, launchOptions) => {
   
    return launchOptions;
  }
  );
  //const file = config.env.configFile || 'staging'
  return getConfigurationByFile(file);
};
