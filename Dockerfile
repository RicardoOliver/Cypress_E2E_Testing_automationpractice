# Use uma imagem base com Node.js e uma imagem do Cypress com Xvfb
FROM cypress/browsers:node16.19.1-chrome114-ff115

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de configuração do projeto e instale as dependências
COPY package*.json ./
RUN npm install

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Instale o Cypress como uma dependência de desenvolvimento
RUN npm install cypress --save-dev

# Copie os arquivos de configuração do Cypress
COPY cypress.config.js ./
COPY cypress/ cypress/

# Exponha a porta que o Cypress usa para rodar os testes (opcional, se estiver usando um servidor de teste)
EXPOSE 8080

# Comando para iniciar o servidor de teste (exemplo com http-server, ajuste conforme necessário)
RUN npm install -g http-server
COPY ./dist /app/dist
CMD ["http-server", "dist", "-p", "8080"]

# Comando para rodar os testes do Cypress (descomente para executar os testes diretamente)
CMD ["npx", "cypress", "run"]

# Comando para iniciar o Cypress em modo interativo (descomente se precisar do modo interativo)
CMD ["npx", "cypress", "open"]

