# Use uma imagem base do Cypress com Node.js 18, Chrome 114, e Firefox 115
FROM cypress/browsers:node18.16.0-chrome114-ff115

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do projeto para o contêiner
COPY . .

# Execute os testes do Cypress
CMD ["npx", "cypress", "run"]
