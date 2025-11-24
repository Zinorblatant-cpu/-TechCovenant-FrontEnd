# 🚀 TechCovenant – Web App

Uma plataforma web moderna para educação financeira com sistema de questões interativo estilo Duolingo, desenvolvida com React e tecnologias de ponta.

## 📋 Sobre o Projeto

O **TechCovenant** é uma aplicação web completa que oferece funcionalidades de autenticação de usuários e um sistema interativo de questões sobre educação financeira. O projeto utiliza uma arquitetura moderna com separação clara entre frontend e backend, oferecendo uma experiência gamificada de aprendizado.

## ✨ Funcionalidades

### 🔐 Sistema de Autenticação
- ✅ **Cadastro de Usuário (Signup)**
  - Validação completa de senha e confirmação
  - Validação de email
  - Envio de dados para API em JSON
  - Tratamento robusto de erros de resposta
  - Redirecionamento automático após cadastro bem-sucedido
  - Feedback visual de erros

- ✅ **Login**
  - Interface completa e funcional
  - Integração completa com API
  - Armazenamento de token no localStorage
  - Tratamento de erros detalhado
  - Redirecionamento após login bem-sucedido

### 🗺️ Mapa de Exercícios (Estilo Duolingo)
- ✅ **Sistema Completo de Progressão**
  - Mapa interativo com 12 fases (4 matérias × 3 dificuldades)
  - 4 matérias: Introdução, Gastos, Planejamento e Poupança
  - 3 níveis de dificuldade: Easy, Medium, Hard
  - Progressão linear: Easy → Medium → Hard por matéria
  - Cada fase contém 3 questões aleatórias

- ✅ **Funcionalidades do Mapa**
  - Visualização do progresso em tempo real
  - Nós coloridos por estado (disponível, bloqueado, completado)
  - Sistema de XP por questão respondida
  - Bloqueio de fases futuras até completar as anteriores
  - Preview do mapa na página inicial

- ✅ **Sistema de Questões**
  - Modal interativo para responder questões
  - Questões aleatórias filtradas por matéria e dificuldade
  - Sistema de prevenção de repetição de questões
  - Feedback visual de resposta correta/incorreta
  - Explicações detalhadas após cada resposta
  - Integração completa com API para envio de respostas

- ✅ **Sistema de Progresso**
  - Persistência de progresso no localStorage
  - Rastreamento de questões respondidas
  - Contador de XP total
  - Contador de fases completadas
  - Botão para resetar histórico (útil para testes)

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19.2.0** - Biblioteca JavaScript para construção de interfaces
- **Vite 7.2.4** - Build tool e dev server de alta performance
- **TailwindCSS 3.4.18** - Framework CSS utility-first
- **React Router DOM 7.9.6** - Roteamento para aplicações React
- **Axios 1.13.2** - Cliente HTTP para requisições à API
- **ESLint** - Linter para qualidade de código

### Backend
- API REST hospedada no Render
- Endpoints disponíveis:
  - `POST /api/users` - Criar usuário
  - `POST /api/login` - Autenticação
  - `GET /api/questions` - Listar questões (com filtros)
  - `POST /api/questions/{id}/answer` - Enviar resposta
- Banco de dados PostgreSQL
- Autenticação via Bearer Token

## 📁 Estrutura do Projeto

```
src/
├── pages/
│   ├── assets/
│   │   ├── LOGOXP2.jpg
│   │   └── perfil.jpg
│   ├── components/
│   │   ├── MapNode.jsx          # Componente de nó do mapa
│   │   ├── MapPreview.jsx      # Preview do mapa para Home
│   │   ├── QuestionModal.jsx    # Modal de questões
│   │   └── QuestoesCarousel.jsx # Carrossel (legado)
│   ├── Home.jsx                 # Página inicial com preview do mapa
│   ├── Login.jsx                # Página de login
│   ├── MapExercises.jsx         # Página completa do mapa de exercícios
│   └── Signup.jsx               # Página de cadastro
├── service/
│   └── api.js                   # Configuração do Axios
├── App.jsx                      # Componente principal com rotas
├── App.css
├── index.css
└── main.jsx                     # Ponto de entrada da aplicação
```

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd TechCovenant-FrontEnd
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione o token secreto para acessar as questões:
   ```
   VITE_SECRET_TOKEN=seu_token_secreto_aqui
   ```
   - **Importante**: No Vite, todas as variáveis de ambiente devem começar com `VITE_` para serem acessíveis no frontend

4. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

5. Acesse a aplicação:
   - Abra seu navegador em `http://localhost:5173` (ou a porta indicada no terminal)

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter ESLint

## 🗺️ Rotas da Aplicação

- `/` - Página inicial (Home) com preview do mapa
- `/login` - Página de login
- `/register` - Página de cadastro
- `/map` - Mapa completo de exercícios (requer autenticação)

## 🔄 Status do Desenvolvimento

### ✅ Concluído
- ✅ Estrutura inicial do projeto
- ✅ Página de cadastro (Signup) funcional e completa
- ✅ Página de login funcional e completa
- ✅ Sistema de autenticação com token
- ✅ Mapa de exercícios estilo Duolingo completo
- ✅ Sistema de questões interativo com modal
- ✅ Sistema de progresso e XP
- ✅ Prevenção de repetição de questões
- ✅ Integração completa com API
- ✅ Preview do mapa na página inicial
- ✅ Persistência de progresso no localStorage
- ✅ Design neutro e equilibrado
- ✅ Configuração de rotas com React Router
- ✅ Tratamento robusto de erros

### 🔄 Em Desenvolvimento
- Sistema de conquistas
- Estatísticas detalhadas do usuário
- Melhorias de performance

### 📋 Próximos Passos
- [ ] Implementar sistema de conquistas
- [ ] Adicionar estatísticas detalhadas do usuário
- [ ] Melhorar animações e transições
- [ ] Adicionar testes unitários e de integração
- [ ] Configurar CI/CD
- [ ] Otimizar performance do mapa
- [ ] Adicionar modo escuro/claro
- [ ] Implementar sistema de notificações

## 🔧 Configuração da API

### Variáveis de Ambiente

O projeto requer uma variável de ambiente para acessar as questões:

```env
VITE_SECRET_TOKEN=seu_token_secreto_aqui
```

**Importante**: No Vite, todas as variáveis de ambiente devem começar com `VITE_` para serem acessíveis no frontend.

### Endpoints da API

#### Autenticação
- `POST /api/users` - Criar novo usuário
  - Body: `{ "email": "string", "password_hash": "string" }`

- `POST /api/login` - Fazer login
  - Body: `{ "email": "string", "password_hash": "string" }`
  - Retorna: Token de autenticação

#### Questões
- `GET /api/questions?subject={materia}&difficulty={dificuldade}` - Listar questões
  - Requer: Bearer Token no header
  - Parâmetros opcionais: `subject` (introducao, gastos, planejamento, poupanca), `difficulty` (Easy, Medium, Hard)

- `POST /api/questions/{question_id}/answer` - Enviar resposta
  - Requer: Bearer Token no header
  - Body: `{ "is_correct": boolean }`

## 🎮 Como Usar

1. **Cadastre-se**: Acesse `/register` e crie sua conta
2. **Faça login**: Acesse `/login` e entre com suas credenciais
3. **Explore o mapa**: Na Home, visualize o preview do mapa de exercícios
4. **Complete fases**: Clique nos nós disponíveis para iniciar uma fase
5. **Responda questões**: Cada fase contém 3 questões aleatórias
6. **Acompanhe progresso**: Veja seu XP e fases completadas no header

## 🐛 Troubleshooting

### Erro 422 ao enviar respostas
- O erro não impede o funcionamento do sistema
- As questões são marcadas como respondidas localmente mesmo com erro na API
- Verifique os logs no console para mais detalhes

### Questões repetidas
- O sistema previne repetição automaticamente
- Use o botão "Resetar" no header para limpar o histórico (útil para testes)

### Token não encontrado
- Certifique-se de criar o arquivo `.env` na raiz do projeto
- Adicione `VITE_SECRET_TOKEN=seu_token`
- Reinicie o servidor de desenvolvimento após criar/alterar o `.env`



