# TechCovenant – Web App

Este projeto está em desenvolvimento e tem como objetivo construir uma plataforma web com funcionalidades de **login**, **signup** e **sistema de questões**, utilizando tecnologias modernas no frontend e backend.

## Status do Desenvolvimento

Atualmente estão sendo implementados os seguintes módulos principais:

### 1. Sistema de Autenticação
A aplicação já possui telas e lógica inicial para:

- **Signup (criação de conta)**
  - Validação de senha e confirmação
  - Envio de dados para a API em JSON
  - Tratamento de erros de resposta
  - Redirecionamento para login após cadastro bem-sucedido

- **Login (em desenvolvimento)**
  - Tela criada
  - Conexão com API será adicionada em seguida

A integração é feita utilizando `fetch` diretamente para a API hospedada no Render.

### 2. Página de Questões (em desenvolvimento)
Após finalizar o fluxo de autenticação, será iniciada a construção do módulo de questões:

- Exibição de questões
- Sistema de respostas
- Lógica de progresso
- Comunicação com backend para armazenar resultados

## Tecnologias Utilizadas

### Frontend
- React.js
- TailwindCSS
- React Router DOM
- Fetch API
- Componentes funcionais e Hooks

### Backend
- API em desenvolvimento (Node.js ou FastAPI)
- Banco PostgreSQL
- Hospedagem via Render

## Estrutura Atual do Projeto

/src
├── pages
│ ├── Login.jsx
│ └── Signup.jsx
├── components
├── App.jsx
└── main.jsx


## Próximos Passos

- Finalizar fluxo completo do login
- Implementar sistema de autenticação com token
- Criar módulo de questões
- Adicionar validações mais robustas
- Melhorar usabilidade e interface

