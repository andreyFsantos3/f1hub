---
name: desenvolver-funcionalidade
description: Processo padronizado para analisar, planejar, implementar e verificar funcionalidades do F1 HUB.
---

# Skill: desenvolver-funcionalidade

Utilize este processo sempre que receber uma solicitação de nova funcionalidade ou alteração relevante no F1 HUB. Leia primeiro `AGENTS.md` e `PRD.md`.

## 1. Análise da solicitação

- Reescreva o objetivo da solicitação em uma frase.
- Identifique quem usará a funcionalidade e qual problema ela resolve.
- Relacione os requisitos do PRD afetados.
- Inspecione os componentes, páginas, serviços, endpoints e testes existentes antes de editar.

## 2. Dúvidas e ambiguidades

- Verifique se faltam regras, campos, estados, permissões ou detalhes visuais essenciais.
- Não invente regras de negócio nem contratos de API.
- Faça perguntas objetivas quando uma decisão do usuário for necessária.
- Se a ambiguidade não bloquear o trabalho, declare a suposição adotada e mantenha a solução simples.

## 3. Planejamento

- Liste os arquivos que serão criados ou alterados.
- Descreva a sequência de implementação.
- Identifique impactos no frontend, backend, banco e integrações externas.
- Defina critérios de aceitação verificáveis.
- Para mudanças de maior porte, registre o plano em `docs/plans/`.

## 4. Implementação

- Respeite as tecnologias e convenções descritas em `AGENTS.md`.
- Reaproveite componentes e serviços existentes.
- Preserve compatibilidade com as telas e endpoints já utilizados.
- Implemente estados de carregamento, sucesso, vazio e erro quando aplicável.
- Não inclua segredos, senhas ou tokens no código.
- Atualize `PRD.md` ou outras documentações se os requisitos mudarem.

## 5. Verificação

- Revise o diff e procure erros, duplicações e código não utilizado.
- Execute `npm run lint` e `npm run build` em `frontend/` quando houver mudanças no frontend.
- Execute `./gradlew.bat test` e `./gradlew.bat build` em `backend/backend/` quando houver mudanças no backend.
- Teste os critérios de aceitação e os estados de erro/carregamento relevantes.
- Não declare testes aprovados se não foram executados. Registre bloqueios do ambiente.
- Ao concluir, apresente resumo, arquivos alterados, verificações executadas e pendências.
