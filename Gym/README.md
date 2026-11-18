# FORMA — Training Club

Frontend de uma plataforma fitness com React. O projeto usa exclusivamente JavaScript, Vite e CSS próprio.

## Estado atual

A aplicação contém navegação entre quatro áreas e uma base visual compartilhada. O dashboard mostra agenda semanal selecionável, indicadores apenas quando os dados da API estiverem disponíveis, estados de carregamento, indisponibilidade, erro e semana vazia. Como o backend ainda não está presente neste repositório, a página informa que os dados não estão conectados e não apresenta resultados fictícios.

A biblioteca e os guias ainda aguardam suas etapas de implementação. Veja [docs/funcionalidades.md](./docs/funcionalidades.md) para o inventário por módulo e [docs/arquitetura.md](./docs/arquitetura.md) para a estrutura, os contratos pendentes e as alternativas de persistência.

## Tecnologias

- JavaScript, React e React DOM.
- HTML e CSS.
- Vite para desenvolvimento e build.
- ESLint para análise estática.

Nenhuma dependência adicional foi instalada.

## Estrutura do frontend

```text
src/
  componentes/
    layout/
      AppShell.jsx
    ui/
      Button.jsx
      Icon.jsx
    Navbar.jsx
  hooks/
    useDashboardData.js
  pages/
    estado_dashboard.jsx
    meus_treinos.jsx
    meus_treinos.css
    administrar_treinos.jsx
    biblioteca_exercicios.jsx
    configuracoes.jsx
    dicas_calculadoras.jsx
  services/
    dashboardService.js
  estilos/
    tokens.css
    global.css
    layout.css
  utils/
    datas.js
  App.jsx
  App.css
  index.css
  main.jsx
```

## Instalação e execução

Na pasta `Gym/Gym`:

```sh
npm install
npm run dev
```

O Vite mostra o endereço local no terminal.

Para integrar o dashboard, configure `VITE_API_BASE_URL` com o endereço da API que implemente o contrato descrito em [docs/arquitetura.md](./docs/arquitetura.md). Sem essa configuração, o dashboard apresenta o estado explícito de integração indisponível.

## Comandos disponíveis

- `npm run dev`: servidor de desenvolvimento.
- `npm run build`: build de produção em `dist/`.
- `npm run preview`: preview local do build.
- `npm run lint`: ESLint.

Ainda não há script de testes automatizados configurado.

## Documentação

Atualize `docs/` ao alterar arquitetura, funcionalidades, componentes, regras ou integrações. Não instale bibliotecas sem justificativa e aprovação.
