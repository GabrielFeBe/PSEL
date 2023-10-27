# Projeto PSEL - Vue.js com Backend Nest.js - Docker Compose

Este é um exemplo de projeto Vue.js com um backend Nest.js, configurado para ser executado em contêineres Docker usando Docker Compose.

## Pré-requisitos

Antes de começar, certifique-se de ter o Docker e o Docker Compose instalados em sua máquina. Você pode baixar e instalar o Docker em [https://www.docker.com/get-started](https://www.docker.com/get-started).

## Como Usar

Siga as etapas abaixo para iniciar o projeto.

1.  Clone o Repositório

- Clone este repositório para o seu ambiente de desenvolvimento:

```bash
  git clone git@github.com:GabrielFeBe/PSEL.git
```

2. Navegue até o Diretório Raiz

   - Navegue até o diretório raiz do projeto:

```bash
  cd PSel
```

3. Inicie os Contêineres

- Execute o seguinte comando para iniciar os contêineres para o backend e o frontend:

```bash
 docker-compose up --build
```

4. Iniciando o Container do Frontend Manualmente (Obrigatorio)

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

5. Acesse a Aplicação

- Isso construirá as imagens Docker e iniciará os contêineres para o backend e o frontend.

- Após a conclusão bem-sucedida, você pode acessar a aplicação Vue.js no seu navegador em:
  http://localhost:8080

6. Licença
   Este projeto está licenciado sob a licença MIT - consulte o arquivo <a href=''>LICENSE<a> para obter detalhes.

## Testes

### Antes de executar os testes

```bash
cd psel-be
```

### Execute os teste com comando

```bash
npm run test:e2e
```

### Configurações de teste

- Os testes são executados em um servidor criado no docker compose, logo caso queira rodar o testes no container tera que mudar a conexão que existe no arquivo `/test/test.module.ts`
- Caso queira usar outro servidor para testes, basta mudar a conexão no arquivo /test/test.module.ts

## Documentação Usando Swagger

- A documentação da API pode ser acessada em http://localhost:3000/api
- Para acessar a documentação da API, é necessário que o servidor esteja rodando, junto com o banco de dados.
- Para acessar as rotas que necessitam de autenticação, é necessário que você tenha um token válido, caso você não tenha uma conta, você pode criar no POST:`/accounts`, logo após você pode fazer o login no POST:`/auth/login` e pegar o token gerado, e colocar no botão Authorize do swagger, para que você possa acessar as rotas que necessitam de autenticação.
- Schemas de entrada e saída de dados estão disponíveis na documentação da API.
- Algo que não fica muito visível no swagger o cpf ou cnpj, deve ser passado sem pontos e traços, apenas numeros, e apenas um dos dois cpf ou cnpj, não pode ser os dois.

# Backend

## Tecnologias

- **NestJS** - Framework para NodeJS
- **TypeORM** - ORM para NodeJS
- **PostgreSQL** - Banco de dados
- **Docker** - Container para o banco de dados e para o servidor
- **Swagger** - Documentação da API
- **Jest** - Testes automatizados

## Arquitetura Modular

Este projeto segue uma arquitetura modular para organizar e estruturar o código de forma clara e coesa. Cada domínio ou recurso do sistema é encapsulado em seu próprio módulo, o que facilita a manutenção, escalabilidade e a compreensão do código. Cada módulo contém controladores, serviços, entidades, DTOs, repositórios e outros componentes específicos do domínio.

### Estrutura de Diretórios

A estrutura de diretórios do projeto segue a seguinte organização:

- `src/main.ts`: Ponto de entrada da aplicação.
- `src/app.module.ts`: Módulo raiz da aplicação.
- Diretórios de módulos:
  - `src/account/`: Módulo de usuários.
  - `src/transaction/`: Módulo de transferências.
  - `src/auth/`: Módulo de autenticação.

Cada módulo pode importar outros módulos e exportar componentes conforme necessário para atender aos requisitos específicos de cada domínio. Isso ajuda a manter a clareza, a modularidade e o desacoplamento do código.

### Benefícios

- Facilita a manutenção e a escalabilidade do código.
- Melhora a compreensão, isolando cada domínio em seu próprio módulo.
- Promove a reutilização de código, pois os módulos podem ser importados em outros lugares conforme necessário.
- Mantém a coesão e o desacoplamento entre os componentes.

Esta abordagem fornece uma base sólida para o desenvolvimento de aplicativos complexos, onde diferentes domínios podem ser gerenciados de forma independente e integrados de maneira eficiente.
