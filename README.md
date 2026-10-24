# API de Gerenciamento de Estoque Médico

## Descrição do Projeto

API RESTful para gerenciar o estoque de materiais e equipamentos médicos. O sistema permite cadastrar, consultar, atualizar e excluir registros por meio de rotas específicas.

A API gerencia três categorias principais:

- **Instrutores:** cadastro e gerenciamento de instrutores.
- **Itens:** gerenciamento dos itens armazenados nos armários **ARMARIO1** e **ARMARIO2**.
- **Materiais utilizados:** registro e gerenciamento dos materiais utilizados.

Cada categoria possui sua própria estrutura de dados, enquanto os itens são organizados em tabelas separadas por armário.

## Funcionalidades

- Criar registros.
- Listar registros.
- Consultar e manipular dados por rotas específicas.
- Atualizar registros existentes.
- Excluir registros.
- Gerenciar os dados por meio de uma API seguindo os princípios REST.

## Tecnologias Utilizadas

- **JavaScript:** linguagem de programação.
- **Node.js:** ambiente de execução do JavaScript no servidor.
- **Fastify.js:** criação e gerenciamento do servidor e das rotas.
- **Knex.js:** construção de consultas e gerenciamento de migrations.
- **SQLite3:** banco de dados utilizado nos testes.
- **PostgreSQL:** banco de dados previsto para utilização no ambiente de produção.
- **Git e GitHub:** versionamento e hospedagem do código-fonte.
- **Visual Studio Code:** ambiente de desenvolvimento.
- **Insomnia:** teste das requisições HTTP e das rotas da API.
- **DB Browser for SQLite:** visualização e consulta do banco de dados SQLite.

## Estrutura do Projeto

```text
.
├── src/
│   ├── controller/       # Tratamento das requisições
│   ├── database/
│   │   ├── migrations/   # Estrutura e criação das tabelas
│   │   ├── configDB.js   # Configuração da conexão com o banco
│   │   └── estoque.db    # Banco SQLite utilizado nos testes
│   ├── repository/       # Acesso e manipulação dos dados
│   └── routes/           # Definição das rotas da API
├── .gitignore
├── knexfile.js           # Configuração do Knex
├── server.js             # Inicialização do servidor Fastify
└── README.md
```

### Responsabilidade das pastas e arquivos

- **controller:** recebe e trata as requisições, coordenando as respostas da API.
- **database/migrations:** define a estrutura das tabelas do banco de dados.
- **database/configDB.js:** configura a conexão com o banco de dados.
- **database/estoque.db:** arquivo SQLite usado durante os testes.
- **repository:** concentra as operações de acesso e manipulação dos dados de cada tabela.
- **routes:** define os caminhos e os métodos HTTP disponíveis.
- **knexfile.js:** reúne as configurações utilizadas pelo Knex.
- **server.js:** configura e inicia o servidor Fastify.
- **.gitignore:** define arquivos e pastas que não devem ser enviados ao Git.

## Como Executar

### Pré-requisitos

- Node.js e npm instalados.
- Git instalado, caso o projeto seja obtido por um repositório.

### Instalação e inicialização

Execute os comandos abaixo no terminal, na pasta raiz do projeto, **na ordem indicada**:

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Execute as migrations para criar as tabelas:

   ```bash
   npx knex migrate:latest
   ```

3. Inicie o servidor em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

Por padrão, a API estará disponível em `http://localhost:3000`, desde que essa seja a configuração definida no projeto.

## Testando a API

Utilize o **Insomnia** para enviar requisições HTTP às rotas da API.

Os métodos REST mais comuns são:

- `GET` — consultar ou listar registros.
- `POST` — criar registros.
- `PUT` ou `PATCH` — atualizar registros.
- `DELETE` — excluir registros.

Os caminhos específicos dependem das rotas implementadas no projeto.

## Pontos Positivos

- **Organização por responsabilidades:** controllers, repositories, routes e database ficam separados, facilitando a manutenção.
- **Uso de migrations:** permite definir e recriar a estrutura do banco de forma organizada.
- **Princípios REST:** o uso de rotas e métodos HTTP apropriados favorece uma API consistente.
- **Separação do acesso aos dados:** os repositories ajudam a concentrar as operações de banco de dados.
- **Ferramentas adequadas para desenvolvimento:** Insomnia e DB Browser for SQLite auxiliam nos testes e na inspeção dos dados.
- **Possibilidade de evolução:** a estrutura pode ser ampliada conforme surgirem novas necessidades do estoque.

## Melhorias Futuras

- **Migrar para PostgreSQL:** configurar o Knex e as variáveis de ambiente para utilizar PostgreSQL no ambiente de produção.
- **Validar os dados recebidos:** verificar campos obrigatórios, tipos, formatos e valores permitidos.
- **Padronizar os erros e as respostas:** retornar códigos HTTP adequados e mensagens consistentes.
- **Adicionar testes automatizados:** testar controllers, repositories e rotas para reduzir falhas durante alterações.
- **Implementar autenticação e autorização:** restringir operações conforme o perfil de cada usuário.
- **Documentar as rotas:** incluir exemplos de requisições, respostas e códigos HTTP, por exemplo com Swagger/OpenAPI.
- **Gerenciar configurações por variáveis de ambiente:** separar configurações de desenvolvimento e produção, sem versionar credenciais.
- **Reforçar o controle de estoque:** considerar quantidades disponíveis, entradas e saídas, histórico de movimentações e alertas de estoque mínimo ou validade, se forem requisitos do projeto.
- **Revisar o versionamento do banco de testes:** avaliar se o arquivo `estoque.db` deve ficar no repositório. Em muitos projetos, é preferível versionar as migrations e manter os dados de teste separados.
- **Adicionar instruções de configuração do PostgreSQL:** documentar os requisitos e os passos necessários para preparar o banco de produção.

## Considerações Finais

Este projeto oferece uma base organizada para o gerenciamento de materiais e equipamentos médicos por meio de uma API RESTful. A separação das responsabilidades e o uso de migrations facilitam a manutenção do código. Com testes automatizados, validação de dados, documentação das rotas e configuração do PostgreSQL, o sistema poderá ganhar mais confiabilidade e estar melhor preparado para uso em produção.
