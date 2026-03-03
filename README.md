# 🏢 Cejam Asset Management (Front-end)

Projeto desenvolvido como parte de um desafio técnico Full Stack, com foco na construção de uma interface moderna, responsiva e funcional para gerenciamento de ativos internos (monitores, teclados, projetores, etc.).

A aplicação consome uma API backend em .NET, disponível publicamente no GitHub, utilizando a variável de ambiente **NEXT_PUBLIC_API_SOURCE_URL**.

## 🔗 Backend (API)

A API responsável pelas regras de negócio e persistência de dados está disponível em:

👉 https://github.com/PFMJunior/CejamAssetManagement

### Tecnologias do backend:
* .NET
* Entity Framework
* SQLite
* Arquitetura baseada em Use Cases

## 🚀 Demonstração

* Interface moderna e intuitiva contendo:
* Listagem de ativos
* Cadastro de novos equipamentos
* Controle de empréstimo e devolução
* Exclusão com confirmação
* Histórico de movimentações
* Layout totalmente responsivo

## ⚙️ Tecnologias utilizadas

* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS
* React Hook Form
* React Hot Toast
* Fetch API (client-side)
* Integração com API .NET

## 📁 Estrutura do projeto

```bash
CEJAM-ASSET-MANAGEMENT/
├── app/
│   ├── page.tsx              # Listagem de ativos
│   ├── cadastro/
│   │   └── page.tsx          # Página de cadastro
│   └── movimentacoes/
│       └── page.tsx          # Histórico de movimentações
├── components/               # Componentes React reutilizáveis
├── services/                 # Cliente HTTP e integração com API
├── types/                    # Tipos TypeScript compartilhados
├── utils/                    # Constantes e utilitários
├── public/                   # Arquivos estáticos
└── package.json
```

## ▶️ Como executar o projeto
### ⚠️ Atenção

Antes de iniciar, é necessário configurar a variável de ambiente apontando para a API backend:
* NEXT_PUBLIC_API_SOURCE_URL=http://localhost:5000

## Passo a passo

1. Instale as dependências:
```bash
npm install
```
2. Configure o arquivo .env.local:
```bash
NEXT_PUBLIC_API_SOURCE_URL=http://localhost:5000
```
3. Execute o projeto:
```bash
npm run dev
```
4. Acesse:
```bash
http://localhost:3000
```

## 🔎 Funcionalidades
### 🗂️ Gestão de Ativos

Permite:
* Cadastro de ativo com nome, código de identificação e status
* Visualização de ativos como:
* ✅ Disponível
* 🔄 Em uso
* Exclusão com confirmação

## 🔄 Controle de Movimentações

* Registro de empréstimos
* Registro de devoluções
* Modal com resumo da ação
* Atualização automática do status
* Histórico completo de movimentações

## 📱 Responsividade

* Layout adaptável para desktop, tablet e mobile
* Tabelas com scroll horizontal quando necessário
* Modais ajustados dinamicamente

## 🧠 Arquitetura

* Separação clara entre:
* UI (components)
* Serviços (services)
* Tipagens (types)
* Componentização reutilizável
* Estado gerenciado com hooks padrão do React
* Tipagem forte com TypeScript
* Integração desacoplada via variável de ambiente
* Estrutura organizada seguindo boas práticas do App Router

## 📦 Scripts disponíveis
Comando	Descrição

```bash
npm run dev	Inicia em modo desenvolvimento
```
```bash
npm run build	Gera build de produção
```
```bash
npm start	Executa build
```
```bash
npm run lint	Verifica linting
```
```bash
npm run format	Formata com Prettier
```
## 👨‍💻 Autor

* Desenvolvido por Paulo Montefusco