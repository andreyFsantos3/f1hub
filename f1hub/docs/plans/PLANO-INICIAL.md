# Plano inicial de desenvolvimento — F1 HUB

## 1. Objetivo

Organizar e evoluir o F1 HUB para oferecer uma central web responsiva com calendário, pilotos, equipes e resultados da Fórmula 1, seguindo os requisitos do `PRD.md`.

## 2. Situação identificada no repositório

O projeto já contém uma aplicação React/Vite com navegação lateral e páginas para calendário, pilotos, equipes e resultados. Também contém um backend Java/Spring Boot com controllers e serviços para calendário, pilotos e resultados, além de configuração para PostgreSQL. Portanto, o plano prioriza estabilizar e verificar o que existe antes de reescrever módulos.

## 3. Etapas planejadas

### Etapa A — Preparação e segurança

- [ ] Revisar a estrutura do frontend e backend.
- [ ] Manter credenciais fora do versionamento e configurar conexão por variáveis de ambiente.
- [ ] Confirmar as versões de Java, Node.js e Gradle necessárias.
- [ ] Documentar como iniciar cada parte do sistema.

### Etapa B — Frontend

- [ ] Validar navegação entre Visão geral, Calendário, Pilotos, Equipes e Resultados.
- [ ] Revisar responsividade em desktop e dispositivos móveis.
- [ ] Padronizar estados de carregamento, erro e ausência de dados.
- [ ] Verificar filtros e atualização das listas.

### Etapa C — Backend e dados

- [ ] Confirmar inicialização do Spring Boot.
- [ ] Validar conexão PostgreSQL usando variáveis de ambiente.
- [ ] Conferir contratos dos endpoints consumidos pelo frontend.
- [ ] Tratar falhas de provedores externos e respostas inesperadas.

### Etapa D — Testes e qualidade

- [ ] Executar lint do frontend.
- [ ] Executar build de produção do frontend.
- [ ] Executar testes e build do backend.
- [ ] Corrigir problemas encontrados e repetir as verificações.
- [ ] Registrar evidências e limitações em `docs/VERIFICACAO.md`.

## 4. Critérios de conclusão

- As quatro áreas principais podem ser abertas pelo menu.
- As consultas de dados funcionam quando as APIs e o banco estão disponíveis.
- A interface comunica carregamento, erro e ausência de dados.
- A navegação e o layout funcionam em telas pequenas e grandes.
- Lint, build e testes são executados e seus resultados são registrados.
- Nenhuma credencial real é mantida no repositório.

## 5. Riscos e dependências

- APIs externas podem ficar indisponíveis ou alterar o formato das respostas.
- O backend depende de configuração válida do PostgreSQL.
- Os testes de integração dependem do acesso ao banco e aos serviços necessários.
- O calendário e os dados esportivos devem ser apresentados conforme a informação efetivamente recebida das fontes.
