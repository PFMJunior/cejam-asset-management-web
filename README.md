# 🏢 Cejam Asset Management (Front-end)

## 📌 Sobre o projeto

Projeto desenvolvido como parte de um **desafio técnico Full Stack**, com foco na construção de uma interface moderna, responsiva e funcional para **gerenciamento de ativos internos** (monitores, teclados, projetores, etc.).

A aplicação consome uma **API backend em .NET**, disponível publicamente no GitHub, utilizando a variável de ambiente:

```
NEXT_PUBLIC_API_SOURCE_URL
```

Essa abordagem permite desacoplar o frontend do backend, facilitando a configuração para diferentes ambientes.

---

# 🔗 Backend (API)

A API responsável pelas regras de negócio e persistência de dados está disponível em:

👉 https://github.com/PFMJunior/CejamAssetManagement

### Tecnologias do backend

* .NET
* Entity Framework
* SQLite
* Arquitetura baseada em Use Cases

---

# 🔌 Como conectar com o Backend

Este projeto consome a API disponível no repositório acima.

### 1️⃣ Executar o backend

Clone o repositório da API:

```
git clone https://github.com/PFMJunior/CejamAssetManagement
```

Entre na pasta do projeto:

```
cd CejamAssetManagement
```

Execute a aplicação:

```
dotnet run
```

A API será iniciada em algo semelhante a:

```
http://localhost:{porta}
```

A porta utilizada pode variar dependendo da configuração do ambiente ou do arquivo `launchSettings.json`.

---

# ⚙️ Configuração do Frontend

No projeto frontend, crie o arquivo:

```
.env.local
```

E configure a URL da API:

```
NEXT_PUBLIC_API_SOURCE_URL=http://localhost:{porta}
```

Substitua `{porta}` pela porta em que a API estiver rodando.

---

# ▶️ Como executar o Frontend

### 1️⃣ Instalar dependências

```
npm install
```

### 2️⃣ Iniciar aplicação

```
npm run dev
```

### 3️⃣ Acessar aplicação

```
http://localhost:3000
```

---

# 🚀 Funcionalidades principais

A aplicação permite:

* 📦 **Listagem de ativos**
* ➕ **Cadastro de novos equipamentos**
* 🔄 **Controle de empréstimo e devolução**
* 🗑️ **Exclusão com confirmação**
* 📜 **Histórico completo de movimentações**
* 📱 **Interface totalmente responsiva**

---

# ⚙️ Tecnologias utilizadas

* **Next.js 14** (App Router)
* **TypeScript**
* **Tailwind CSS**
* **React Hook Form**
* **React Hot Toast**
* **Fetch API**
* Integração com **API .NET**

---

# 📁 Estrutura do projeto

```
CEJAM-ASSET-MANAGEMENT/
├── app/
│   ├── page.tsx              # Listagem de ativos
│   ├── cadastro/
│   │   └── page.tsx          # Página de cadastro
│   └── movimentacoes/
│       └── page.tsx          # Histórico de movimentações
├── components/               # Componentes React reutilizáveis
├── services/                 # Integração com API
├── types/                    # Tipos TypeScript
├── utils/                    # Constantes e utilitários
├── public/                   # Arquivos estáticos
└── package.json
```

---

# 🧠 Arquitetura

O projeto segue uma organização baseada em responsabilidades:

**UI Layer**

* Componentes React reutilizáveis (`components`)

**Service Layer**

* Comunicação com a API (`services`)

**Types Layer**

* Tipagens TypeScript compartilhadas (`types`)

**Utilities**

* Constantes e helpers (`utils`)

A comunicação com o backend é feita através da **Fetch API**, utilizando uma **URL base configurada via variável de ambiente**.

---

# 📱 Responsividade

A interface foi construída com foco em adaptação para diferentes dispositivos:

* Desktop
* Tablet
* Mobile

Inclui:

* tabelas com scroll horizontal
* modais responsivos
* layout flexível

---

# 📦 Scripts disponíveis

| Comando        | Descrição                                |
| -------------- | ---------------------------------------- |
| npm run dev    | Inicia o projeto em modo desenvolvimento |
| npm run build  | Gera build de produção                   |
| npm start      | Executa a aplicação em modo produção     |
| npm run lint   | Verifica problemas de lint               |
| npm run format | Formata código com Prettier              |

---

# 👨‍💻 Autor

Desenvolvido por **Paulo Montefusco**

🔗 LinkedIn
https://www.linkedin.com/in/paulo-montefusco/