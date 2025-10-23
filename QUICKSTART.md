# Guia Rápido

Rodar o projeto em 5 minutos.

## Instalação

```bash
# Clone
git clone https://github.com/wellsla/magazord-github-explorer.git
cd magazord-github-explorer

# Instale
npm install

# Configure
cp .env.example .env.local
# Edite .env.local e adicione a url base da API e seu token do GitHub

# Execute
npm run dev
```

Abra http://localhost:3000

## Token do GitHub (opcional)

Sem token: 60 requests/hora  
Com token: 5.000 requests/hora

1. Gere em: https://github.com/settings/tokens
2. Escopo: `public_repo`
3. Cole no `.env.local`

## Como usar

**Buscar usuário**

- Digite pelo menos 4 caracteres
- Pressione Enter ou clique no usuário

**Ver repositórios**

- Use os filtros (Type/Language)
- Busque repositórios específicos

**Ver favoritos**

- Clique na tab "Starred"

**Detalhes do repo**

- Clique em qualquer repositório
- Veja issues abertas

## Testar responsivo

Chrome/Edge:

1. F12 (DevTools)
2. Ctrl+Shift+M (Device Toolbar)
3. Teste: iPhone, iPad, Desktop

Breakpoints:

- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## Comandos

```bash
npm run dev    # Desenvolvimento
npm run build  # Build
npm run start  # Rodar build
npm run lint   # Lint
```

## Problemas comuns

**Porta 3000 em uso**

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [número] /F
```

**Erro de módulos**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Erro de cache**

```bash
rm -rf .next
npm run dev
```

**Rate limit**

- Adicione token no `.env.local`
- Aguarde 1 hora
- Use React Query cache

## Estrutura

```
src/
├── app/         # Páginas
├── components/  # Componentes
├── features/    # Hooks, services
├── lib/         # Utils, types
└── ui/          # Componentes base
```

---

**Setup:** 5 minutos  
**Node.js:** 18+
