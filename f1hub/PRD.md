# PRD — F1 HUB

## 1. Identificação do produto

- **Nome:** F1 HUB — Race Center
- **Tipo:** aplicação web para acompanhamento de informações da Fórmula 1.
- **Status do documento:** versão inicial, baseada na estrutura e nas funcionalidades encontradas no repositório.

## 2. Objetivo e descrição

O F1 HUB tem como objetivo reunir em um único ambiente informações da temporada de Fórmula 1. A aplicação apresenta áreas para consultar calendário de Grandes Prêmios, pilotos, equipes e resultados, com uma interface inspirada em centrais de transmissão esportiva. O frontend é desenvolvido em React e Vite, e o backend utiliza Java com Spring Boot e PostgreSQL. Algumas informações são obtidas por APIs externas.

## 3. Público-alvo

- Pessoas que acompanham a Fórmula 1;
- Fãs que desejam consultar datas e etapas da temporada;
- Usuários interessados em informações de pilotos, equipes e resultados.

## 4. Problema que o sistema pretende resolver

As informações da categoria ficam distribuídas entre diferentes páginas e serviços. O F1 HUB busca facilitar o acesso, organizando os principais dados da temporada em uma interface única e de navegação simples.

## 5. Requisitos funcionais

| Código | Requisito |
|---|---|
| RF01 | O sistema deve apresentar uma página inicial com visão geral e atalhos para as áreas principais. |
| RF02 | O sistema deve exibir o calendário de corridas de um ano selecionado ou configurado. |
| RF03 | O calendário deve apresentar informações disponíveis de cada etapa, como Grande Prêmio, país, circuito e datas. |
| RF04 | O usuário deve poder filtrar as corridas por situação, incluindo próximas e realizadas, quando esses dados estiverem disponíveis. |
| RF05 | O sistema deve consultar e exibir informações de pilotos por meio da fonte de dados configurada. |
| RF06 | O sistema deve apresentar uma área de equipes da Fórmula 1. |
| RF07 | O sistema deve disponibilizar uma área para consulta de resultados de corridas. |
| RF08 | O usuário deve conseguir navegar entre as seções pelo menu principal. |
| RF09 | O sistema deve informar ao usuário quando os dados estiverem carregando ou quando ocorrer uma falha de consulta. |

## 6. Requisitos não funcionais

| Código | Requisito |
|---|---|
| RNF01 | A interface deve ser responsiva e utilizável em computadores e dispositivos móveis. |
| RNF02 | O frontend deve ser implementado em React, utilizando Vite como ferramenta de desenvolvimento e build. |
| RNF03 | O backend deve utilizar Java e Spring Boot, com persistência em PostgreSQL quando aplicável. |
| RNF04 | Credenciais e dados sensíveis de conexão não devem ficar versionados no código-fonte. |
| RNF05 | Falhas de rede ou de APIs externas devem ser tratadas sem deixar a interface em estado indefinido. |

## 7. Regras de negócio

1. O calendário deve identificar cada corrida por sua etapa e apresentar as datas recebidas da fonte de dados.
2. A situação da corrida deve ser calculada a partir das datas: próxima, em andamento ou realizada.
3. Os filtros do calendário devem mostrar somente os registros compatíveis com a opção selecionada.
4. Os dados externos dependem da disponibilidade e do formato das APIs consultadas; a aplicação deve apresentar uma mensagem quando não conseguir carregá-los.
5. As informações persistidas no banco devem ser acessadas pelo backend, sem expor credenciais do banco ao navegador.
6. A navegação entre as seções não deve exigir recarregamento completo da página.

## 8. Critérios de aceitação

- [ ] A aplicação inicia em ambiente local seguindo as instruções do projeto.
- [ ] A página inicial apresenta a identidade F1 HUB e atalhos para as seções.
- [ ] O menu permite acessar Calendário, Pilotos, Equipes e Resultados.
- [ ] O calendário apresenta corridas quando a API está disponível e informa falhas quando não está.
- [ ] Os filtros do calendário atualizam a lista apresentada.
- [ ] A área de pilotos apresenta dados ou uma mensagem clara de erro/carregamento.
- [ ] As áreas de equipes e resultados são acessíveis e apresentam seus dados ou estados vazios/erro adequados.
- [ ] A interface se adapta a telas menores.
- [ ] O projeto passa pelo build de produção do frontend.
- [ ] As credenciais do banco são configuradas por variáveis de ambiente e não ficam no repositório.

## 9. Tecnologias identificadas

- **Frontend:** React 19, Vite 8, JavaScript e CSS.
- **Backend:** Java 17, Spring Boot, Gradle e Spring Data JPA.
- **Banco de dados:** PostgreSQL (configuração compatível com Supabase).
- **Fontes externas:** APIs de dados da Fórmula 1 utilizadas pelos módulos do sistema.

## 10. Fora do escopo desta versão

Aplicativo móvel nativo, compra de ingressos, transmissão de vídeo ao vivo e autenticação de usuários não estão definidos como requisitos desta versão do produto.
