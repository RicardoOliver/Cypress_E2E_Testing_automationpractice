import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { faker } from '@faker-js/faker';

Given('que estou na tela de automationpractice', () => {
  cy.viewport(1600, 1000);
  cy.visit('/index.php');
});

And('deve validar a tela de inicio automationpractice', () => {
  cy.get('#index').should('be.visible');
});

And('devo clicar em Sign in', () => {
  cy.get('.login').click();
  cy.screenshot('Sign in/Sign in/clicando em Sign in');
});

And('devo criar uma conta', () => {
  const email = faker.internet.email();
  cy.get('#email_create').type(email); // Adicionado para preencher o email
  cy.get('#SubmitCreate').click();
  cy.screenshot('criar email/criar email/email criado');
});

When('adicionar suas informações pessoais', () => {
  cy.get('#id_gender1').check();
  cy.get('#customer_firstname').type('Nome');
  cy.get('#customer_lastname').type('Sobrenome');
  cy.get('#passwd').type('SenhaForte123');
  cy.get('#days').select('1');
  cy.get('#months').select('January');
  cy.get('#years').select('2000');
  cy.get('#submitAccount').click();
  cy.screenshot('informações pessoais/informações pessoais/dados pessoais preenchidos');
});

Then('deve validar a mensagem Your account has been created.', () => {
  cy.get('.alert').should('contain.text', 'Your account has been created');
  cy.screenshot('usuario criado com sucesso/usuario criado com sucesso/usuario criado');
  cy.get('li > .btn > span').click();
});
