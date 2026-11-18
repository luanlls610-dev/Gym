# Arquitetura

## Estado atual

Este repositório contém somente o frontend. É uma SPA JavaScript com React, iniciada em `src/main.jsx` e empacotada pelo Vite.

- `src/App.jsx` mantém a área selecionada e a preferência de tema, e compõe as páginas.
- `src/componentes/layout/AppShell.jsx` fornece a estrutura compartilhada de navegação e conteúdo.
- `src/componentes/Navbar.jsx` exibe a navegação principal.
- `src/componentes/ui/Button.jsx` padroniza variantes de botão.
- `src/componentes/ui/Icon.jsx` fornece ícones SVG locais.
- `src/estilos/tokens.css` define cores dos temas, tipografia, foco e medidas.
- `src/estilos/global.css` define regras base, foco de teclado e suporte a movimento reduzido.
- `src/estilos/layout.css` define shell, sidebar, barra inferior e comportamento responsivo.
- `src/pages/` contém as áreas e seus estilos específicos.
- `src/hooks/useDashboardData.js` controla o carregamento e os estados dos dados do dashboard.
- `src/services/dashboardService.js` encapsula a chamada HTTP e valida o formato básico da resposta.
- `src/utils/datas.js` contém formatação de datas e duração.
- `src/App.css` contém estilos comuns das páginas restantes; estilos do dashboard estão em `src/pages/meus_treinos.css`.

A navegação entre módulos continua em estado React local; não existe roteamento por URL. A preferência de tema é salva em `localStorage`. Dados de treino não são persistidos por este frontend.

## Contrato pendente para o backend

O dashboard usa uma fronteira de serviço configurável por `VITE_API_BASE_URL`. Foi proposto, e ainda precisa ser implementado pelo backend, o seguinte contrato:

`GET /api/dashboard?weekStart=YYYY-MM-DD`

Resposta esperada (JSON):

```json
{
  "weekStart": "YYYY-MM-DD",
  "days": [
    {
      "date": "YYYY-MM-DD",
      "isRestDay": false,
      "workout": {
        "id": "string",
        "name": "string",
        "focus": "string",
        "exerciseCount": 5,
        "estimatedDurationMinutes": 50
      },
      "session": {
        "id": "string",
        "completedAt": "ISO-8601",
        "durationMinutes": 48
      }
    }
  ],
  "recentSessions": [
    {
      "id": "string",
      "workoutName": "string",
      "completedAt": "ISO-8601",
      "durationMinutes": 48
    }
  ]
}
```

O array `days` deve conter os sete dias iniciando na segunda-feira. `workout` ou `session` podem ser `null`; dia de descanso deve ser identificado explicitamente. `recentSessions` contém registros reais recentes. Em uma resposta válida sem treinos, a interface apresenta estado vazio; sem URL/API ou com rota inexistente, apresenta integração indisponível; erros de servidor e respostas fora do contrato são informados como erro.

Esse contrato é uma proposta de integração do frontend, não evidência de que a API exista. Nenhuma operação de cadastro, alteração ou conclusão de treino é simulada.

## Camadas do frontend

- **Páginas:** organizam a interface por fluxo ou módulo.
- **Componentes compartilhados:** layout, botões, ícones e estados de tela.
- **Hooks:** lógica de interação e carregamento reutilizável.
- **Serviços:** comunicação HTTP isolada da apresentação.
- **Utilitários:** formatação de datas e valores.
- **Estilos:** tokens globais e estilos locais por layout/página.

Usar estado local quando suficiente; compartilhar estado apenas quando várias áreas precisarem do mesmo dado. As próximas funcionalidades deverão mapear carregamento, sucesso, erro, indisponibilidade e vazio.

## Persistência — decisão ainda pendente

A TASK 02 cobre frontend e não escolhe banco. Alternativas a avaliar antes do backend:

- **SQLite:** implantação simples para protótipos ou instância única; avaliar concorrência, backups e escala operacional.
- **PostgreSQL:** apropriado para concorrência e múltiplos usuários; requer serviço, migrações e operação de backup.

A decisão depende de hospedagem, contas, sincronização, uso offline e recuperação de dados. Não usar `localStorage` para simular persistência central de treinos.

## Temas e visual

Tokens CSS sustentam tema escuro e claro. `App.jsx` aplica `data-tema` na raiz e salva a preferência localmente. O foco usa token próprio por tema; CSS global respeita `prefers-reduced-motion`.

## Componentes

| Componente | Responsabilidade |
|---|---|
| `AppShell` | Envolver navegação e conteúdo |
| `Navbar` | Navegar entre quatro áreas |
| `Button` | Estilo e variantes de botões |
| `Icon` | Ícones vetoriais locais |
| `EstadoDashboard` | Estados de carregamento, indisponibilidade, erro e vazio |
| `MeusTreinos` | Dashboard, agenda selecionável e histórico |

## Validação

Scripts disponíveis: `npm run lint` e `npm run build`. Não há suíte automatizada configurada. As verificações de interface desta etapa incluem estados da API, agenda, navegação por teclado, temas e larguras de tela.
