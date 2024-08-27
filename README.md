# Cypress Testes End-to-End

## Descrição

Este projeto é uma suíte de testes automatizados utilizando Cypress para realizar testes end-to-end em um portal web. A suíte é configurada para executar testes automatizados, gerando relatórios detalhados e armazenando artefatos como screenshots e vídeos das execuções dos testes.
<p align="center"> <a href="#funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <a href="#estrutura-do-projeto">Estrutura do Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <a href="#tecnologias-utilizadas">Tecnologias Utilizadas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <a href="#como-executar">Como Executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <a href="#pipeline-de-cicd">Pipeline de CI/CD</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <a href="#contribuicoes">Contribuições</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <a href="#licenca">Licença</a> </p>
Funcionalidades

  Testes End-to-End Automatizados: Suíte de testes desenvolvida com Cypress para verificar a funcionalidade completa do portal web.
  Relatórios Cucumber HTML: Integração com multiple-cucumber-html-reporter para gerar relatórios detalhados e interativos em HTML.
  Geração de Dados Dinâmicos: Utilização do pacote faker-br para criar dados dinâmicos e realistas durante os testes.
  Armazenamento de Artefatos: Captura e armazenamento de screenshots, vídeos, e relatórios, com retenção de 30 dias utilizando GitHub Actions.

## Estrutura do Projeto

  cypress/: Contém os testes Cypress, além de pastas para screenshots, vídeos, e definições de passos (step definitions).
  node_modules/: Dependências instaladas.
  cypress/reports/: Relatórios gerados pelo Cypress com Mochawesome e Cucumber.
  .github/workflows/: Arquivo de configuração do pipeline do GitHub Actions.
  package.json: Arquivo de configuração do Node.js com scripts e dependências.

## Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/) : Framework de teste de front-end que facilita a automação de testes de integração e de ponta a ponta.

- [Multiple Cucumber HTML Reporter]([https://www.npmjs.com/package/cypress-mochawesome-reporter](https://www.npmjs.com/package/multiple-cucumber-html-reporter)) : Reporter customizado para Cypress que gera relatórios em HTML.

- [faker-br](https://www.npmjs.com/package/faker-br) : Biblioteca para geração de dados falsos/dinâmicos com localizações específicas para o Brasil.

- GitHub Actions: Serviço de CI/CD para automatizar fluxos de trabalho no GitHub.

## Como Executar

-Instalação das Dependências:

    npm install
    
-Executar os Testes:

    npx cypress run
    
-Abrir o Cypress para Execução Interativa:

    npm run cypress:open

-Gerar Relatórios Multi-Cucumber HTML:

    npm run generate-multi-cucumber-html-report

## Pipeline de CI/CD

O projeto está configurado para ser integrado ao GitHub Actions, onde o pipeline é executado automaticamente em cada push ou pull request. O pipeline realiza as seguintes etapas:

-Instala as Dependências: Baixa e instala todas as dependências necessárias para a execução dos testes.
-Executa os Testes Cypress: Realiza os testes automatizados.
-Gera Relatórios: Cria relatórios detalhados em HTML utilizando Mochawesome e Cucumber.
-Armazena Artefatos: Salva screenshots, vídeos, e relatórios como artefatos, disponíveis para download por 30 dias.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues, enviar pull requests ou sugerir melhorias.
Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais informações.

