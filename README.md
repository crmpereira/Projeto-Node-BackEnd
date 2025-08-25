# 🚀 API Backend - Sistema de Gerenciamento

## 📋 Descrição
API REST completa desenvolvida em Node.js com Express e MySQL, implementando um sistema robusto de gerenciamento de clientes, produtos, pedidos e itens de pedido com autenticação JWT e documentação Swagger.

## 🛠️ Tecnologias Utilizadas
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **MySQL** - Banco de dados relacional
- **Sequelize** - ORM para Node.js
- **JWT** - Autenticação e autorização
- **Swagger UI** - Documentação interativa da API
- **bcrypt** - Criptografia de senhas
- **CORS** - Controle de acesso entre origens
- **dotenv** - Gerenciamento de variáveis de ambiente

## ✨ Funcionalidades Implementadas
- ✅ **CRUD Completo**: Clientes, produtos, pedidos e itens de pedido
- ✅ **Autenticação JWT**: Sistema seguro de login e autorização
- ✅ **Validação Robusta**: Middleware de validação para todos os endpoints
- ✅ **Tratamento de Erros**: Sistema centralizado de tratamento de erros
- ✅ **CORS Configurado**: Suporte para múltiplas origens
- ✅ **Documentação Swagger**: Interface interativa para testes
- ✅ **Recálculo Automático**: Valor total de pedidos atualizado automaticamente
- ✅ **Pedidos Vazios**: Suporte para criação de pedidos sem itens iniciais

## 🚀 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd projeto-node-backend
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e configure suas credenciais:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Configurações do Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_NAME=seu_banco
DB_USER=seu_usuario
DB_PASSWORD=sua_senha

# Configurações do Servidor
PORT=5000
NODE_ENV=development

# Configurações JWT
JWT_SECRET=seu_jwt_secret_muito_seguro
JWT_EXPIRES_IN=24h

# Configurações CORS
CORS_ORIGIN=http://localhost:3000
```

### 4. Execute a aplicação
```bash
# Desenvolvimento
node src/app.js

# ou com nodemon (se instalado)
npm run dev
```

## 📚 Documentação da API

Após iniciar o servidor, acesse a documentação interativa Swagger em:
```
http://localhost:5000/api-docs/
```

## 🔗 Endpoints Principais

### 🔐 Autenticação
- `POST /api/login` - Login de usuário
- `POST /api/register` - Registro de novo usuário

### 👥 Clientes
- `GET /clientes` - Listar todos os clientes
- `GET /clientes/:id` - Buscar cliente por ID
- `POST /clientes` - Criar novo cliente
- `PUT /clientes/:id` - Atualizar cliente
- `DELETE /clientes/:id` - Deletar cliente

### 📦 Produtos
- `GET /produtos` - Listar todos os produtos
- `GET /produtos/:id` - Buscar produto por ID
- `POST /produtos` - Criar novo produto
- `PUT /produtos/:id` - Atualizar produto
- `DELETE /produtos/:id` - Deletar produto

### 🛒 Pedidos
- `GET /pedidos` - Listar todos os pedidos
- `GET /pedidos/:id` - Buscar pedido por ID
- `POST /pedidos` - Criar novo pedido (pode ser criado vazio)
- `PUT /pedidos/:id` - Atualizar pedido
- `DELETE /pedidos/:id` - Deletar pedido

### 📋 Itens de Pedido
- `GET /itens-pedido` - Listar todos os itens
- `GET /itens-pedido/:id` - Buscar item por ID
- `GET /itens-pedido/pedido/:id_pedido` - Listar itens de um pedido
- `POST /itens-pedido` - Adicionar item ao pedido
- `PUT /itens-pedido/:id` - Atualizar item do pedido
- `DELETE /itens-pedido/:id` - Remover item do pedido

### 🌍 Estados
- `GET /estados` - Listar todos os estados

## 🔧 Funcionalidades Especiais

### Recálculo Automático
O valor total dos pedidos é recalculado automaticamente sempre que:
- Um item é adicionado ao pedido
- Um item é atualizado (quantidade ou preço)
- Um item é removido do pedido

### Pedidos Vazios
O sistema permite criar pedidos sem itens iniciais, facilitando o fluxo de trabalho onde os itens são adicionados posteriormente.

## 🛡️ Segurança
- Todas as senhas são criptografadas com bcrypt
- Autenticação JWT com tokens seguros
- Validação rigorosa de dados de entrada
- Middleware de tratamento de erros

## 🚀 Deploy

### Variáveis de Ambiente para Produção
```env
NODE_ENV=production
PORT=5000
DB_HOST=seu_host_producao
DB_NAME=seu_banco_producao
DB_USER=seu_usuario_producao
DB_PASSWORD=sua_senha_producao
JWT_SECRET=jwt_secret_muito_seguro_para_producao
CORS_ORIGIN=https://seu-frontend.com
```

## 🤝 Contribuição
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte
Para suporte, abra uma issue no GitHub ou entre em contato através do email.

## 📁 Estrutura do Projeto
```
src/
├── controllers/     # Lógica de negócio e operações CRUD
├── routes/         # Definição de rotas e documentação Swagger
├── middleware/     # Middlewares de validação e autenticação
├── models/         # Modelos do banco de dados
├── config/         # Configurações (Swagger, etc.)
├── app.js          # Configuração principal da aplicação
├── db.js           # Conexão com MySQL
└── sequelize.js    # Configuração do Sequelize ORM
```

## 🗄️ Entidades do Banco
- **clientes** - Cadastro completo de clientes
- **estados** - Estados brasileiros para endereços
- **produtos** - Catálogo de produtos com preços
- **pedidos** - Pedidos dos clientes com valor total
- **itens_pedido** - Itens individuais dos pedidos

---

**Desenvolvido com ❤️ usando Node.js e Express**
