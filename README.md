# Garotas em Código

Plataforma web para incentivar a participação feminina na área de TI, desenvolvida como Trabalho de Conclusão de Curso (TCC).

## ⚙️ Funcionalidades

- **Cadastro e autenticação** com JWT
- **Perfil editável** com foto de perfil via Cloudinary
- **Feed de publicações** com curtidas
- **Mentoria colaborativa** — conexões entre alunas e guias por área de TI, com chat em tempo real via Socket.IO
- **Referências femininas** na tecnologia (Inspirações)
- **Áreas de TI** para navegação por interesse
- **Oportunidades** (cursos, eventos, bolsas e vagas)

## 🚀 Tecnologias

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + TypeScript + Express
- **Banco de Dados**: PostgreSQL + Prisma ORM
- **Comunicação em Tempo Real**: Socket.IO
- **Autenticação**: JWT
- **Armazenamento de imagens**: Cloudinary

## 📁 Estrutura do Projeto

```
/
├── client/                  # Frontend React
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── contexts/
│       ├── pages/
│       ├── services/
│       ├── types/
│       └── utils/
│
└── server/                  # Backend Node.js
    ├── prisma/              # Schema e migrações
    ├── generated/           # Prisma Client gerado
    └── src/
        ├── configs/
        ├── controllers/
        ├── middleware/
        ├── models/
        ├── routes/
        └── socket/
```

## 🛠️ Pré-requisitos

- Node.js >= 18
- npm >= 8
- PostgreSQL >= 13
- Conta no [Cloudinary](https://cloudinary.com/)

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/evelyn-martins/garotas-em-codigo.git
cd garotas-em-codigo
```

### 2. Instale as dependências

```bash
npm install
cd server && npm install
cd ../client && npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp server/.env.example server/.env
```

Edite o arquivo `server/.env` com suas credenciais.

### 4. Crie o banco de dados

```sql
CREATE DATABASE garotas_em_codigo;
```

### 5. Execute as migrações do Prisma

```bash
cd server
npx prisma migrate dev
```

## 🚀 Como Executar

### Opção 1: Executar ambos simultaneamente (recomendado)

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Opção 2: Executar separadamente

**Terminal 1 — Servidor (Backend):**

```bash
cd server
npm run dev
```

**Terminal 2 — Cliente (Frontend):**

```bash
cd client
npm run dev
```

O servidor estará disponível em `http://localhost:3000` e o frontend em `http://localhost:5173`.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 👩‍💻 Desenvolvedora

**Evelyn Martins**  
TCC — Tecnologia em Análise e Desenvolvimento de Sistemas
