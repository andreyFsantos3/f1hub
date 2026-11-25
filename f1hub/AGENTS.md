# Instruções para agentes de desenvolvimento — F1 HUB

## Contexto

O F1 HUB é uma aplicação web de acompanhamento da Fórmula 1. Consulte `PRD.md` antes de propor ou implementar mudanças e registre planos em `docs/plans/`.

## Tecnologias

- Frontend: React, JavaScript, Vite e CSS em `frontend/`.
- Backend: Java 17, Spring Boot, Gradle e Spring Data JPA em `backend/backend/`.
- Banco: PostgreSQL.

## Padrões de desenvolvimento

1. Mantenha os componentes React organizados em `frontend/src/`; páginas específicas ficam em `frontend/src/pages/`.
2. Reutilize os módulos existentes antes de criar componentes duplicados.
3. Trate estados de carregamento, ausência de dados e erros de API na interface.
4. Mantenha chamadas HTTP isoladas ou organizadas de forma consistente. Não exponha credenciais no frontend.
5. No backend, preserve a separação entre controller, service, model e repository.
6. Use nomes claros em português, seguindo o padrão já adotado no módulo alterado.
7. Não adicione dependências sem justificar a necessidade.
8. Preserve a responsividade e a identidade visual esportiva do F1 HUB.
9. Não altere contratos de API sem verificar os consumidores no frontend.
10. Nunca grave senhas, tokens ou chaves reais em arquivos versionados. Utilize variáveis de ambiente.

## Comandos importantes

### Frontend

No terminal, entre em `frontend/`:

```powershell
npm install
npm run dev
npm run lint
npm run build
```

### Backend

No terminal, entre em `backend/backend/`:

```powershell
.\gradlew.bat bootRun
.\gradlew.bat test
.\gradlew.bat build
```

Configure `DB_URL`, `DB_USERNAME` e `DB_PASSWORD` no ambiente antes de iniciar o backend. Consulte `.env.example` para os nomes esperados. Não coloque credenciais reais no Git.

## Processo obrigatório para novas funcionalidades

Siga a Skill `desenvolver-funcionalidade`, localizada em `.claude/skills/desenvolver-funcionalidade/SKILL.md`. Analise o pedido, esclareça ambiguidades, planeje, implemente e verifique. Atualize a documentação quando o comportamento do produto mudar.

## Antes de concluir uma tarefa

- Revise os arquivos alterados.
- Execute lint e build do frontend quando houver alteração nele.
- Execute testes/build do backend quando houver alteração nele e o ambiente permitir.
- Informe claramente os comandos executados, resultados e limitações.
