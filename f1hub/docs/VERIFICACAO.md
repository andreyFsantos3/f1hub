# Verificação do projeto F1 HUB

> Este arquivo deve ser atualizado após executar os comandos no ambiente de desenvolvimento. Não marque uma verificação como aprovada sem executá-la.

## Checklist

| Verificação | Comando | Resultado |
|---|---|---|
| Lint do frontend | `cd frontend; npm run lint` | Pendente de execução no ambiente local |
| Build do frontend | `cd frontend; npm run build` | Pendente de execução no ambiente local |
| Testes do backend | `cd backend/backend; .\gradlew.bat test` | Pendente de execução no ambiente local |
| Build do backend | `cd backend/backend; .\gradlew.bat build` | Pendente de execução no ambiente local |
| Teste integrado com PostgreSQL | Iniciar backend com `DB_URL`, `DB_USERNAME` e `DB_PASSWORD` configurados | Depende das credenciais e da disponibilidade do banco |

## Testes manuais recomendados

- [ ] Abrir a página inicial.
- [ ] Navegar para Calendário, Pilotos, Equipes e Resultados.
- [ ] Conferir os filtros do calendário.
- [ ] Simular indisponibilidade de API e conferir a mensagem exibida.
- [ ] Conferir o layout em largura mobile.
- [ ] Confirmar que o backend inicia e consulta o banco sem credenciais no código.

## Registro de correções

- A configuração de conexão do PostgreSQL foi ajustada para ler `DB_URL`, `DB_USERNAME` e `DB_PASSWORD` do ambiente. Configure os valores reais localmente e não os publique no repositório.
