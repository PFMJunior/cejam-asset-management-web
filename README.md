# Cejam Asset Management (Front-end)

Aplicão web para gerenciamento interno de equipamentos compartilhados (monitores, teclados, projetores etc.).
Parte do projeto full-stack, o código do backend (.NET) está disponível em:
https://github.com/PFMJunior/CejamAssetManagement

Esta interface consome a API via NEXT_PUBLIC_API_SOURCE_URL.

---

**Demonstra��o das principais funcionalidades**

- Cadastro de ativo com nome, código e status.
- Listagem responsiva mostrando estados  Dispon�vel ou Em Uso.
- Empréstimo/devolução atravás de modal com resumo de ação.
- Exclusão de ativo com confirmação.
- Histórico de movimentações exibindo empréstimos e devoluções.

---

**Tecnologias utilizadas**

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form
- React Hot Toast
- Fetch API (client-side)

---

**Estrutura do projeto**

`
/app                   # rotas e páginas Next.js
    page.tsx           # lista de ativos
    cadastro/page.tsx  # página de cadastro
    movimentacoes/     # histórico de movimentações
/components            # componentes React reutilizáveis
/services              # cliente HTTP para a API
/types                 # tipos TypeScript compartilhados
/utils                 # utilitários (cores, constantes)
/public                # arquivos estáticos (imagens, logos)
`

---

**Como executar**

> O front depende de um backend (não incluído aqui). Configure NEXT_PUBLIC_API_SOURCE_URL antes de iniciar.

1. Instale as dependências:
   `ash
   npm install  # ou yarn install
   `
2. Defina as variáveis de ambiente:
   `env
   NEXT_PUBLIC_API_SOURCE_URL=https://api.exemplo.com
   `
3. Inicie em modo desenvolvimento:
   `ash
   npm run dev
   `
4. Acesse http://localhost:3000.

Outros scripts úteis:

| Comando | Descrição |
|---------|-----------|
| 
pm run build | Gera build de produção |
| 
pm start | Executa build |
| 
pm run lint | Verifica linting |
| 
pm run format | Formata com Prettier |

---

**Principais funcionalidades detalhadas**

- **Cadastro**         : validações de campos e dependência de status/usuário.
- **Listagem**         : tabela com estilos adaptativos e ações de editar/remover.
- **Modal de edição**: controla empréstimo/devolução e comentários.
- **Movimentações**    : histórico completo com datas e status.
- **Caminho de dados** : serviços em /services centralizam fetchs e tratamento de erros.

---

**Responsividade e UX**

O layout funciona em desktop, tablet e mobile. Classes Tailwind garantem
scroll horizontal em tabelas estreitas e modais são dimensionados automaticamente.

---

**Arquitetura**

- Separação clara entre UI, serviços e tipos.
- Componentes pequenos e reutilizáveis.
- Estado local gerenciado com hooks padrão.
- Tipagens TypeScript cobrindo todas as props e payloads.

---

**Autor**

Desenvolvido por Paulo Montefusco.
