Feature: Autenticar usuario no site automationpractice


Scenario: criar acesso de login automationpractice
   Given que estou na tela de automationpractice
   And deve validar a tela de inicio automationpractice
   And devo clicar em Sign in
   And devo criar uma conta
   When adicionar suas informações pessoais
   Then deve validar a mensagem Your account has been created.
