# Diário de Desenvolvimento

> Como construí o GitHub Explorer, do zero até o deploy

---

## Dia 1 - Começando do zero

Criei o projeto com `create-next-app` usando Next.js. Primeira coisa: organizar a estrutura de pastas. Percebi que precisava de uma camada clara entre a API e os componentes, então mudei alguns arquivos de lugar logo no início. Melhor fazer isso cedo do que precisar refatorar depois.

## Primeiros passos com a API

Comecei implementando as chamadas para a API do GitHub. Criei um serviço para buscar dados do usuário - nome, avatar, bio, essas coisas básicas. Testei com meu próprio usuário pra ver se funcionava.

Logo depois, adicionei mais endpoints:

- Buscar contas sociais (Twitter, LinkedIn)
- Listar repositórios do usuário
- Pegar repositórios específicos
- Listar os repositórios favoritados (starred)

Funcionou, mas o código tava ficando repetitivo. Muitos `try/catch` parecidos.

## Melhorando a estrutura de dados

Adicionei o **shadcn/ui** pro projeto. Gosto dos componentes deles - são acessíveis e bem feitos. Instalei os básicos: botões, cards, inputs.

Aí tive uma ideia: usar **Zod** pra validar as respostas da API. Assim eu garanto que os dados que vêm do GitHub estão no formato que eu espero. Criei schemas pros principais tipos: User, Repository, SocialAccount. Foi trabalhoso mas deu mais segurança no código.

Refatorei toda a camada de API pra usar os schemas do Zod. Agora, se a API do GitHub mudar algo inesperado, eu capturo o erro antes de quebrar a UI.

## React Query entra em cena

Percebi que tava fazendo muita chamada desnecessária pra API. Se o usuário navegava e voltava, buscava tudo de novo. Hora de adicionar **React Query**.

Criei os primeiros hooks:

- `useUser` - busca dados do usuário, repos e starred tudo junto
- `useRepo` - busca detalhes de um repositório específico

O legal do React Query é que ele cuida do cache automaticamente. Se você já buscou aquele usuário, ele não busca de novo. Simples assim.

Refatorei os hooks uma vez. Antes tinha tudo num hook só, mas ficou confuso. Separei em `useUser` e `useRepo`. Cada um com sua responsabilidade.

## Construindo os layouts

Comecei pelos layouts base. Header e estrutura geral das páginas. Nada muito elaborado ainda, só a fundação.

Depois criei os layouts específicos:

- Layout pra home (busca de usuários)
- Layout pro perfil (com sidebar)
- Layout pra página de repositório

Revisei tudo antes de mergir. Ajeitei alguns espaçamentos que tavam estranhos.

## Componentes visuais

Hora de criar os componentes que o usuário vê de verdade.

**RepoCard** foi o primeiro. Um card simples mostrando nome, descrição, estrelas e forks do repositório. Usei ícones do **Lucide React** - são leves e bonitos.

**FilterBar** foi mais trabalhoso. Precisava de filtros por tipo (public, private, fork, etc) e por linguagem. Criei um componente que muda entre dropdown (desktop) e sheet (mobile). Ficou legal.

**SearchField** - só um input com ícone de lupa. Bem simples.

**UserSearchBar** - mais complexo. Mostra os resultados enquanto você digita, com avatares e tudo.

**ProfileSidebar** - esse foi interessante. Mostra o perfil do usuário com avatar, bio, empresa, localização. Precisei fazer 3 versões responsivas: uma pra mobile, outra pra tablet, outra pra desktop. Cada uma com layout diferente.

Mudei a estrutura de alguns componentes. Alguns tavam muito acoplados, outros muito genéricos. Busquei o equilíbrio.

## Estado global com Zustand

Adicionei **Zustand** pra gerenciar os filtros. Eles precisam persistir entre páginas (repos e starred), então fazia sentido ter um estado global.

Criei uma store simples: `useUiStore`. Guarda o tipo de filtro, linguagem selecionada e ordem de classificação. Só isso. Zustand é ótimo porque não precisa de boilerplate.

## Construindo as páginas

Agora era montar as páginas de verdade, juntando tudo.

**Home** - Campo de busca grande no centro. Você digita um usuário do GitHub e ele mostra os resultados. Tem que digitar pelo menos 4 caracteres. Quando seleciona um usuário, botão pra ver o perfil aparece.

**Página do usuário** - Aqui juntei tudo: sidebar com perfil, tabs pra alternar entre repositórios e starred, lista de repos com filtros funcionando. Passei um tempo fazendo os filtros funcionarem direitinho.

**Página de starred** - Basicamente igual a de repos, mas mostra os favoritos do usuário.

**Página do repositório** - Mostra detalhes do repo e lista as issues abertas. As issues são clicáveis e abrem no GitHub.

## Configuração e validação

Adicionei suporte pra token do GitHub. Sem token, você só tem 60 requests por hora. Com token, são 5000. Coloquei a configuração no `.env.local`.

Também adicionei validação de erros comuns da API: rate limit, repo não encontrado, usuário não existe. Mostro mensagens claras pro usuário em cada caso.

## Ajustes finais de design

Aqui foi onde gastei mais tempo. Precisava deixar o mais próximo possível do Figma.

Ajustei as tabs - removi o fundo e coloquei só uma linha embaixo quando ativa. Ficou mais limpo.

Removi as sombras dos cards. O design do Figma não tinha sombras, só bordas sutis.

Mudei as cores dos botões de filtro pra azul (`#0587FF`), pra ficar na mesma ideia do design.

Ajustei o ProfileSidebar várias vezes até encaixar nos 3 layouts (mobile, tablet, desktop).

Adicionei uns detalhes que não tavam no design mas achei que melhoravam:

- Emoji badge nos avatares (cada usuário tem um emoji fixo baseado no ID dele)
- Contador de caracteres na busca (mostra "X/4" quando você tá digitando)
- Botão "Back" no header quando você tá dentro de um repo
- Alguns padrões do shadcn que acabaram encaixando

Formatei os nomes dos repositórios no header. Em vez de mostrar "meu-repo-legal", mostro "Meu Repo Legal". Fica mais legível.

## Problemas que encontrei

**Tabs do Radix UI** - Tive que sobrescrever praticamente todos os estilos padrão. A documentação deles ajuda, mas precisa de paciência.

**Filtros responsivos** - Decidi fazer dois componentes em um: dropdown pra desktop, sheet pra mobile. Usei classes do Tailwind (`hidden md:block`) pra controlar o que aparece.

**Emoji nos avatares** - A API não retorna isso, então criei um sistema que gera um emoji consistente baseado no ID do usuário. Sempre o mesmo emoji pro mesmo usuário.

**Layout responsivo da sidebar** - Em vez de tentar fazer um layout se adaptar, criei 3 layouts separados com `hidden` e `flex` do Tailwind. Ficou mais fácil de manter.

**Busca com debounce** - O hook `useSearchUsers` já tinha debounce de 500ms. Mas precisei ajustar pra não fazer chamada se tiver menos de 4 caracteres.

## O que aprendi

**React Query é poderoso** - O cache dele economiza muitas chamadas desnecessárias. Vale a pena aprender bem.

**Zustand é simples** - Bem mais simples que Redux. Pra estados globais pequenos, é perfeito.

**Zod adiciona segurança** - Ter validação em runtime me salvou algumas vezes de bugs estranhos.

**Radix UI é acessível** - Não preciso me preocupar tanto com ARIA labels e navegação por teclado. Eles já fazem o trabalho pesado.

**Layouts responsivos** - Às vezes é melhor criar layouts separados do que tentar forçar um único layout a se adaptar. Código fica mais limpo.

**Design no Figma != código pixel perfect** - Algumas coisas precisam ser ajustadas pra funcionar bem no navegador. E tudo bem.

## Conclusão

No final, ficou um projeto que funciona bem, é rápido (graças ao cache) e segue o design. O código tá organizado, sem muita mágica. Se eu precisar adicionar algo novo, sei onde colocar.

---

**Tech stack final:**

- Next.js 15 (App Router)
- TypeScript
- TailwindCSS 4
- React Query
- Zustand
- Zod
- Radix UI
- Axios

**Deploy:** Vercel (push pra main e ele sobe automaticamente)

**Tempo total:** ~2 dias de trabalho

---
