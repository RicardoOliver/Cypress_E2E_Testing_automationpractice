# Use uma imagem base do Node.js 20
FROM node:20

# Instalação das dependências necessárias
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    xdg-utils \
    libglib2.0-0 \
    libnss3 \
    libgconf-2-4 \
    libfontconfig1 \
    libcanberra-gtk-module \
    libxss1 \
    libxtst6 \
    libgtk-3-0 \
    xvfb \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Instalação do Google Chrome
RUN curl -sSLO "https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb" && \
    dpkg -i google-chrome-stable_current_amd64.deb || apt-get -fy install && \
    rm google-chrome-stable_current_amd64.deb

# Instalação do Firefox
RUN apt-get update && apt-get install -y firefox-esr --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

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
