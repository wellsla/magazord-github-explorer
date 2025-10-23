# GitHub Explorer

Aplicação para explorar perfis e repositórios do GitHub. Desenvolvida para o desafio técnico Magazord.

## 🚀 Ver funcionando

**Deploy:** https://magazord-github-explorer.vercel.app

## 📖 Documentação

- 📄 **README.md** - Você está aqui
- 📝 **[DEV-JOURNAL.md](./DEV-JOURNAL.md)** - Como construí o projeto (diário de desenvolvimento)
- ⚡ **[QUICKSTART.md](./QUICKSTART.md)** - Instalação rápida

## O que faz

- Busca usuários do GitHub
- Lista repositórios e favoritos
- Filtra por tipo e linguagem
- Mostra detalhes e issues
- Funciona em mobile, tablet e desktop

## Tecnologias

**Requisitos do desafio:**

- Next.js 15
- TypeScript
- TailwindCSS 4
- Zustand (estado global)
- React Query (cache)
- Vercel (deploy)

**Outras libs:**

- Axios (HTTP)
- Zod (validação)
- Radix UI (componentes)
- Lucide (ícones)

## Como rodar

```bash
# Clone
git clone https://github.com/wellsla/magazord-github-explorer.git
cd magazord-github-explorer

# Instale
npm install

# Configure (opcional mas recomendado)
cp .env.example .env.local
# Adicione seu token do GitHub em .env.local
# Sem token: 60 requests/hora | Com token: 5000 requests/hora

# Execute
npm run dev
```

Abra http://localhost:3000

## Estrutura básica

```
src/
├── app/          # Páginas (Next.js App Router)
├── components/   # Componentes visuais
├── features/     # Hooks, serviços, stores
├── lib/          # Utils e tipos
└── ui/           # Componentes base (Radix UI)
```

## Principais desafios

**Design responsivo**  
Criei 3 layouts diferentes (mobile, tablet, desktop) em vez de tentar adaptar um só. Ficou mais fácil de manter.

**Filtros**  
Dropdown no desktop, bottom sheet no mobile. Usei Zustand pra persistir entre páginas.

**Rate limit da API**  
Adicionei suporte a token opcional e React Query faz cache automático das chamadas.

**Emojis nos avatares**  
A API não retorna isso, então criei um sistema que gera um emoji consistente baseado no ID do usuário.

## O que aprendi

- React Query economiza muitas chamadas desnecessárias
- Zustand é bem mais simples que Redux pra estado global
- Zod adiciona segurança nas respostas da API
- Às vezes é melhor criar layouts separados que tentar adaptar um único

## Possíveis melhorias

- Testes (Jest + Playwright)
- Dark mode
- Histórico de buscas
- PWA com cache offline
- Gráficos de atividade

## Autor

Welliton Slaviero

**Figma do projeto:** [Design Original](https://www.figma.com/file/sf1CmqcEZbUzkeZOA4AUGj/TESTE-FRONT-MAGAZORD?node-id=0%3A1)
