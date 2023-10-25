# Use a imagem oficial do Node.js como base
FROM node:16.18-alpine

# Cria o diretório de trabalho e define-o como o diretório padrão
WORKDIR /psel-backend

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código-fonte da aplicação para o diretório de trabalho
COPY . .

# Expõe a porta que a aplicação Nest.js irá utilizar (por padrão, 3000)
EXPOSE 3000


ENTRYPOINT ["npm", "run"]

CMD ["start"]
