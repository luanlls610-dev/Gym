# Inventário de funcionalidades

Um elemento visual não comprova que a ação esteja conectada a dados ou persistência. Os estados refletem o frontend existente após a etapa 2 da TASK 02.

| Módulo | Estado | Evidência e observação |
|---|---|---|
| Navegação principal | Parcial | Quatro áreas selecionáveis por estado React; sidebar desktop e barra inferior mobile. Ainda não há URL independente para cada área. |
| Sistema visual | Base compartilhada | Tokens CSS, tema claro/escuro, botões e ícones SVG locais. |
| Tema claro/escuro | Implementado no frontend | Aplicado sem recarga e salvo em `localStorage`. |
| Dashboard — data e saudação | Implementado | Data e saudação derivadas do relógio local. |
| Dashboard — resumo semanal | Parcial, conectado por contrato | Métricas são derivadas de resposta real; ficam indisponíveis sem API configurada. Nenhum valor de treino de demonstração é apresentado. |
| Agenda semanal | Implementada na interface | Exibe sete dias; cada dia é selecionável e atualiza a área de detalhe. Os treinos dependem do contrato da API. |
| Estados da API | Implementados no frontend | Carregamento, vazio, indisponível, erro HTTP e resposta fora do formato esperado. |
| Histórico | Parcial, conectado por contrato | Exibe sessões retornadas pela API; vazio quando resposta válida não contém sessões. |
| CRUD de treinos | Ausente | Será tratado na etapa própria; não há operações simuladas. |
| Biblioteca de exercícios | Ausente | Pesquisa, filtros, catálogo e detalhes pendentes. |
| Guias e calculadoras | Ausente | Conteúdo e ferramentas pendentes. |
| Execução e cronômetro | Ausente | Fluxo e temporizador pendentes. |
| Backend e persistência de treinos | Ausente neste repositório | O contrato do dashboard foi documentado como proposta, mas não há API neste projeto. |

Atualize o inventário ao conectar cada ação ao comportamento real. Operações dependentes de backend indisponível devem ser identificadas sem mensagens fictícias de sucesso.
