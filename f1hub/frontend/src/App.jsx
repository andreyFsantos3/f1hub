
import { useState, useEffect } from "react";
import "./App.css";
import Calendario from "./pages/Calendario.jsx";
import Pilotos from "./pages/Pilotos.jsx";
import Equipes from "./pages/Equipes.jsx";
import Resultados from "./pages/Resultados.jsx";
import DestaquesCorridas from "./pages/DestaquesCorridas";

const secoes = [
  { nome: "Visão geral", icone: "⌂" },
    { nome: "Equipes", icone: "🏎" },
  { nome: "Calendário", icone: "▦" },
  { nome: "Pilotos", icone: "♙" },
  { nome: "Resultados", icone: "🏆" },
  { nome: "Sobre o projeto", icone: "ⓘ" },
];

function App() {
  const [secao, setSecao] = useState(() => {
    return localStorage.getItem("f1hub_secao") || "Visão geral";
  });

  useEffect(() => {
    localStorage.setItem("f1hub_secao", secao);
  }, [secao]);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-icon">F1</span>
          <div>
            <strong>F1 HUB</strong>
            <small>RACE CENTER</small>
          </div>
        </div>
        
       

        <p className="menu-label">MENU PRINCIPAL</p>

        <nav>
          {secoes.map((item) => (
            <button
              key={item.nome}
              className={`menu-item ${
                secao === item.nome ? "ativo" : ""
              }`}
              onClick={() => setSecao(item.nome)}
            >
              <span>{item.icone}</span>
              {item.nome}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="status-dot" />
          F1 HUB
          <small> • Temporada 2026</small>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <span className="breadcrumb">F1 HUB / 2026</span>
            <h2>{secao}</h2>
          </div>

          <div className="season-badge">
            <span className="status-dot" />
            TEMPORADA 2026
          </div>
        </header>
        {secao === "Calendário" ? (
          <Calendario />
        ) : secao === "Pilotos" ? (
          <Pilotos />
        ) : secao === "Equipes" ? (
          <Equipes />
        ) : secao === "Resultados" ? (
          <Resultados />
        ) : secao === "Sobre o projeto" ? (
          <section className="project-info">
            <span className="eyebrow">DOCUMENTAÇÃO DO PRODUTO</span>
            <h1>Conheça o F1 HUB</h1>
            <p className="project-lead">Uma central de informações da Fórmula 1 para reunir calendário, pilotos, equipes e resultados em um só lugar.</p>
            <div className="project-info-grid">
              <article className="project-info-card"><span>OBJETIVO</span><h3>Informação em um só lugar</h3><p>Facilitar o acompanhamento da temporada de Fórmula 1 por meio de uma interface organizada e intuitiva.</p></article>
              <article className="project-info-card"><span>PÚBLICO-ALVO</span><h3>Fãs do automobilismo</h3><p>Pessoas que acompanham corridas e desejam consultar informações sobre etapas, pilotos, equipes e resultados.</p></article>
              <article className="project-info-card"><span>PROBLEMA</span><h3>Dados espalhados</h3><p>As informações da categoria ficam distribuídas em diferentes serviços. O F1 HUB centraliza o acesso aos principais conteúdos.</p></article>
              <article className="project-info-card"><span>TECNOLOGIAS</span><h3>React + Spring Boot</h3><p>Frontend com React e Vite, backend com Java e Spring Boot e banco de dados PostgreSQL.</p></article>
            </div>
            <div className="project-functions">
              <h2>Principais funcionalidades</h2>
              <ul><li>Consulta ao calendário da temporada e situação das corridas.</li><li>Visualização e pesquisa de pilotos.</li><li>Consulta às equipes da categoria.</li><li>Acompanhamento de resultados.</li><li>Navegação integrada entre as áreas do sistema.</li></ul>
            </div>
            <p className="project-doc-note">A documentação técnica e o planejamento completo estão disponíveis nos arquivos <strong>PRD.md</strong>, <strong>AGENTS.md</strong> e <strong>docs/plans/PLANO-INICIAL.md</strong> na raiz do projeto.</p>
          </section>
        ) : secao === "Visão geral" ? (
          <>
           
<section
  className="welcome"
  style={{
    "--scroll-offset": `${scrollY * 0.12}px`
  }}
>
  <div className="welcome-content">

    <span className="eyebrow">
      FORMULA 1 • RACE CENTER
    </span>

    <h1>
      O mundo da F1,
      <br />
      em um só lugar.
    </h1>

    <p>
      Acompanhe pilotos, equipes, corridas e resultados
      da maior categoria do automobilismo.
    </p>

    <button
      className="primary-button"
      onClick={() => setSecao("Calendário")}
    >
      Explorar calendário <span>→</span>
    </button>

  </div>

</section>
{secao === "Visão geral" && (
  <div className="dashboard">

    {/* CARD DE DESTAQUES DAS CORRIDAS */}
    <DestaquesCorridas />

    {/* RESTANTE DOS CARDS DO DASHBOARD */}

  </div>
)}

            <div className="section-heading">
              <div>
                <span className="eyebrow">
                  CENTRAL DE INFORMAÇÕES
                </span>
                <h2>Explore a temporada</h2>
              </div>

              <span className="muted">TEMPORADA 2026</span>
            </div>

            <section className="cards">
              <article className="info-card">
                <div className="card-top">
                  <span className="card-icon">▦</span>
                  <span className="card-arrow">↗</span>
                </div>

                <span className="card-label">PROGRAMAÇÃO</span>
                <h3>Calendário</h3>
                <p>Confira as etapas da temporada.</p>

                <button onClick={() => setSecao("Calendário")}>
                  Ver calendário →
                </button>
              </article>

              <article className="info-card">
                <div className="card-top">
                  <span className="card-icon">♙</span>
                  <span className="card-arrow">↗</span>
                </div>

                <span className="card-label">CLASSIFICAÇÃO</span>
                <h3>Pilotos</h3>
                <p>Acompanhe os competidores.</p>

                <button onClick={() => setSecao("Pilotos")}>
                  Ver pilotos →
                </button>
              </article>

              <article className="info-card">
                <div className="card-top">
                  <span className="card-icon">🏎</span>
                  <span className="card-arrow">↗</span>
                </div>

                <span className="card-label">CONSTRUTORES</span>
                <h3>Equipes</h3>
                <p>Conheça as equipes da F1.</p>

                <button onClick={() => setSecao("Equipes")}>
                  Ver equipes →
                </button>
              </article>

              <article className="info-card">
                <div className="card-top">
                  <span className="card-icon">🏆</span>
                  <span className="card-arrow">↗</span>
                </div>

                <span className="card-label">DESEMPENHO</span>
                <h3>Resultados</h3>
                <p>Veja posições e resultados.</p>

                <button onClick={() => setSecao("Resultados")}>
                  Ver resultados →
                </button>
              </article>
            </section>

            <footer className="footer">
              <span>F1 HUB © 2026</span>
              <span>FEITO PARA QUEM VIVE A VELOCIDADE.</span>
            </footer>
          </>
        ) : (
          <section className="welcome">
            <div className="welcome-content">
              <span className="eyebrow">F1 HUB • TEMPORADA 2026</span>
              <h1>{secao}</h1>
              <p>
                Esta seção está sendo preparada.
                Em breve você poderá acompanhar todas as informações.
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
