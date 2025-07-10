# Teste full stack

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)](https://www.fastify.io/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![tsx](https://img.shields.io/badge/tsx-blue?style=for-the-badge)](https://tsx.is/)
[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)


## 🎯 Sobre o Projeto

Este projeto foi criado para cumprir o desafio técnico da vaga de Desenvolvedor(a) Full Stack. O objetivo é uma aplicação web completa para **gerenciamento de tarefas (to-do list)**, demonstrando habilidades em desenvolvimento backend, frontend, arquitetura de software e boas práticas de versionamento com Git.

A aplicação permite que os usuários se autentiquem com sua conta Google e gerenciem suas próprias tarefas de forma segura e intuitiva.

---

## ✨ Funcionalidades

- ✅ **Autenticação de Usuários**: Login seguro utilizando o protocolo OAuth 2.0 com o Google.
- ✅ **Gestão Completa de Tarefas (CRUD)**:
    - Criação de novas tarefas.
    - Edição de tarefas existentes.
    - Exclusão de tarefas.
- ✅ **Controle de Status**: Marcar e desmarcar tarefas como concluídas.
- ✅ **Listagem e Filtragem**: Visualização clara de tarefas pendentes e concluídas.
- ✅ **Interface Responsiva**: Layout adaptável para uma ótima experiência em desktops e dispositivos móveis.
- ✅ **Deploy Contínuo**: O projeto está publicado online e configurado para deploy automático.

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar a aplicação no seu ambiente local.

### **Pré-requisitos**

- **[Node.js](https://nodejs.org/)** (v18+)
- **[npm](https://www.npmjs.com/)** ou **[yarn](https://yarnpkg.com/)**
- Uma instância do **PostgreSQL** em execução
- Credenciais **Google OAuth 2.0** (crie no [Google Cloud Console](https://console.cloud.google.com/apis/credentials))

---

### **1. Backend**

```bash
# Navegue para a pasta do backend
cd backend

# Instale as dependências
npm install
```

Crie um arquivo `.env` na raiz da pasta backend e preencha com suas credenciais, usando o `.env.example` como modelo:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO"
PORT=3000
FRONTEND_URL="http://localhost:5173"
GOOGLE_CLIENT_ID="SEU_CLIENT_ID_DO_GOOGLE"
GOOGLE_CLIENT_SECRET="SEU_CLIENT_SECRET_DO_GOOGLE"
GOOGLE_REDIRECT_URI="http://localhost:3000/auth/google/callback"
JWT_SECRET="CRIE_UM_SEGREDO_FORTE_AQUI"
```

```bash
# Execute as migrações para criar as tabelas no banco de dados
npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev
```

---

### **2. Frontend**

Abra um **novo terminal** e navegue para a pasta do frontend:

```bash
cd frontend

# Instale as dependências
npm install
```

Crie um arquivo `.env.local` na raiz da pasta frontend e adicione a seguinte variável:

```env
VITE_API_BASE_URL="http://localhost:3000/"
```

```bash
# Inicie o servidor de desenvolvimento do frontend
npm run dev
```

A aplicação estará disponível em [http://localhost:5173](http://localhost:5173).

---

## 🧪 Testes

Para garantir a qualidade e a integridade do código, o projeto inclui testes automatizados.

**Para rodar os testes do backend:**

```bash
cd backend
npm test
```

---

## 🗺️ Endpoints da API

A API segue um padrão RESTful. Todas as rotas de `/task/` são protegidas e requerem um token JWT.

| Método | Rota                  | Descrição                            |
| ------ | --------------------- | ------------------------------------ |
| GET    | /auth/google/url      | Obtém a URL de autorização do Google |
| GET    | /auth/google/callback | Rota de callback para o Google       |
| GET    | /task/                | Lista todas as tarefas do usuário    |
| POST   | /task/                | Cria uma nova tarefa                 |
| GET    | /task/:id            | Obtém uma tarefa específica          |
| PATCH  | /task/:id            | Atualiza uma tarefa                  |
| DELETE | /task/:id            | Apaga uma tarefa                     |

---

