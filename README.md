# Brev.ly

Sistema de encurtador de links fullstack (Node.js + React).

## Pré-requisitos

- Node.js 20+
- Docker e Docker Compose (opcional, recomendado para rodar o banco de dados)
- npm (ou yarn/pnpm)

---

## Backend (server)

### 1. Instalação

```bash
cd server
npm install
```

### 2. Banco de Dados

O projeto utiliza SQLite por padrão. As migrações já estão na pasta `server/src/infra/db/migrations`.

Para rodar com Docker (recomendado para produção):

````bash
# Build da imagem
cd server
# (edite .env se necessário)
docker build -t brevly-server .
# Suba o container

### 1. Instalação
```bash
cd server
npm install
````

### 2. Rodando o Backend

#### Ambiente de Desenvolvimento

```bash
# Inicie o servidor com hot reload (TypeScript)
---
# ou
npx tsx --watch --env-file .env src/infra/http/server.ts
```

- `npm run build` — compila o TypeScript para produção
- `node dist/infra/http/server.js` — inicia o servidor compilado em produção

# Brev.ly

Sistema de encurtador de links fullstack (Node.js + React).

---

## 1. Pré-requisitos

- Node.js 20 ou superior
- npm (ou yarn/pnpm)
- Docker (opcional, recomendado para produção)

---

## 2. Rodando o Backend (server)

### Instalação

```bash
cd server
npm install
```

### Ambiente de Desenvolvimento

```bash
npm start
```

Isso inicia o servidor com hot reload (TypeScript). A API ficará disponível em http://localhost:3333.

### Ambiente de Produção

1. Compile o projeto:
   ```bash
   npm run build
   ```
2. Rode o servidor compilado:
   ```bash
   node dist/infra/http/server.js
   ```

### Usando Docker (opcional)

```bash
cd server
docker build -t brevly-server .
docker run -p 3333:3333 brevly-server
```

---

## 3. Rodando o Frontend (web)

### Instalação

```bash
cd web
npm install
```

### Ambiente de Desenvolvimento

```bash
npm run dev
```

Acesse http://localhost:5173 no navegador.

### Build de Produção

```bash
npm run build
npm run preview
```

---

## 4. Observações

- O backend aceita requisições do frontend local por padrão.
- Se necessário, ajuste as URLs em `server/src/infra/http/server.ts` e `web/src/service/api.ts`.
- A documentação da API está disponível em http://localhost:3333/docs.
- O banco de dados padrão é SQLite, já configurado.

---

## 5. Scripts úteis

### Backend

- `npm start` — inicia o servidor em modo desenvolvimento (hot reload)
- `npm run build` — compila o TypeScript para produção
- `node dist/infra/http/server.js` — inicia o servidor compilado em produção

### Frontend

- `npm run dev` — inicia o Vite em modo desenvolvimento
- `npm run build` — build de produção
- `npm run preview` — preview do build

---

## Licença

MIT
