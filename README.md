# api-auth-escribo

```bash
# Clone Repository
$ git clone https://github.com/gilsonfsdev/api-auth-escribo.git

# Go to server folder
$ cd api-auth-escribo

# Install Dependencies
$ npm install

# run docker compose
$ docker compose up -d

# run prisma
$ npx prisma migrate dev
$ npx prisma generate

# Run Tests
$ npm run test
```

## Rotas
- Criar novo usuário
```bash
POST /signup
```

- Autenticar usuário
```bash
POST /signin
```

- Listar dados do usuário (necessário estar autenticado)
```bash
GET /signin/user
```
