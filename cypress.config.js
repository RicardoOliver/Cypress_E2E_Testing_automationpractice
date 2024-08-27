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
      const testenv = process.env.TEST_ENV || config.env.testenv || 'automationpractice';

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

      // Adiciona o Job Summary e imprime o resumo no console
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

        // Salva o resumo em um arquivo JSON
        const summaryPath = 'cypress/reports/job-summary.json';
        fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf-8');

        // Formata o resumo para o console
        const durationInSeconds = (summary.runDuration / 1000).toFixed(3);
        console.log('\nCypress Results');
        console.log('Result    Passed ✅  Failed ❌  Pending ✋  Skipped ↩️  Duration 🕗');
        console.log(`Passing ✅    ${summary.totalPassed}        ${summary.totalFailed}          ${summary.totalPending}         ${summary.totalSkipped}       ${durationInSeconds}s`);
        console.log(`\nJob Summary saved at ${summaryPath}`);
      });

      return config;
    },
    specPattern: "cypress/e2e/step_definitions/*.feature"
  },
  env: {},
});
