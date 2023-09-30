# Projeto PSEL - Vue.js com Backend Nest.js - Docker Compose

Este é um exemplo de projeto Vue.js com um backend Nest.js, configurado para ser executado em contêineres Docker usando Docker Compose.

## Pré-requisitos

Antes de começar, certifique-se de ter o Docker e o Docker Compose instalados em sua máquina. Você pode baixar e instalar o Docker em [https://www.docker.com/get-started](https://www.docker.com/get-started).

## Como Usar

Siga as etapas abaixo para iniciar o projeto.

1.  Clone o Repositório

- Clone este repositório para o seu ambiente de desenvolvimento:
  git clone git@github.com:GabrielFeBe/PSEL.git

2. Navegue até o Diretório Raiz

   - Navegue até o diretório raiz do projeto:
     cd PSEL

3. Inicie os Contêineres

- Execute o seguinte comando para iniciar os contêineres para o backend e o frontend:

- docker-compose up --build

- Isso construirá as imagens Docker e iniciará os contêineres para o backend e o frontend.

4. Acesse a Aplicação

   - Após a conclusão bem-sucedida, você pode acessar a aplicação Vue.js no seu navegador em:
     http://localhost:8080

5. Iniciando o Container do Frontend Manualmente (Obrigatorio)

- Navegue até o diretório do frontend:
  cd psel-fe

- Execute o comando Docker Build para criar a imagem do frontend:

```bash
docker build -t vuejs-cookbook/dockerize-vuejs-app .
```

- Inicie o container do frontend:

```bash
docker run -it -p 8080:8080 --rm --name dockerize-vuejs-app-1 vuejs-cookbook/dockerize-vuejs-app
```

- Isso iniciará o container do frontend Vue.js.

6. Licença
   Este projeto está licenciado sob a licença MIT - consulte o arquivo <a href=''>LICENSE<a> para obter detalhes.
