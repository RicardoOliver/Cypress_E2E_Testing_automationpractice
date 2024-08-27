const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default;
const fs = require('fs');

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
      const testenv = process.env.TEST_ENV || config.env.testenv || 'automationpractice'; // 'automationpractice' é definido como padrão se nada for passado

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

      // Adiciona o Job Summary
      on('after:run', (results) => {
        const summary = {
          totalTests: results.totalTests,
          totalPassed: results.totalPassed,
          totalFailed: results.totalFailed,
          totalPending: results.totalPending,
          totalSkipped: results.totalSkipped,
          browserName: results.browserName,
          browserVersion: results.browserVersion,
          osName: results.osName,
          osVersion: results.osVersion,
          runDuration: results.totalDuration,
        };

        // Define o caminho onde o resumo será salvo
        const summaryPath = 'cypress/reports/job-summary.json';

        // Salva o resumo em um arquivo JSON
        fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf-8');

        console.log(`Job Summary saved at ${summaryPath}`);
      });

      return config;
    },
    specPattern: "cypress/e2e/step_definitions/*.feature"
  },
  env: {},
});
