const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  projectId: '9f5hbh',
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // Configura o cypress-cucumber-preprocessor
      on('file:preprocessor', cucumber());

      // Configura o cypress-mochawesome-reporter
      require('cypress-mochawesome-reporter/plugin')(on);

      // Corrige a estrutura do objeto reporterOptions
      config.reporterOptions = {
        reportDir: 'cypress/report/mochawesome-report',
        overwrite: true,
        html: true,
        json: false,
        timestamp: 'mmddyyyy_HHMMss'
      };

      // Define o ambiente de teste
      const testenv = process.env.TEST_ENV || config.env.testenv || 'automationpractice'; // 'tcemt' é definido como padrão se nada for passado

      // Função para carregar o host baseado no ambiente
      function loadHost(testenv) {
        let host, appUrl, loginServer;

        if (testenv === 'automationpractice') {
          host = `${testenv}.automationpractice.pl`;
          appUrl = `http://${testenv}.automationpractice.pl`;
          loginServer = `http://www.automationpractice.pl${testenv}`;
        } else if (testenv !== 'localhost') {
          
          throw new Error(`Ambiente de teste inválido: ${testenv}`);
        }

        return { host, appUrl, loginServer };
      }

      // Carrega o host e ajusta as configurações de ambiente
      const { appUrl, ...targetHost } = loadHost(testenv);
      config.env = targetHost;

      // Altera a baseUrl
      config.baseUrl = appUrl;

      return config;
    },
    specPattern: "cypress/e2e/step_definitions/*.feature"
  },
  env: {},
});
