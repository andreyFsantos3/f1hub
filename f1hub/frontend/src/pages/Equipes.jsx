
import "./Equipes.css";

const equipes = [
  {
    nome: "McLaren",
    cor: "#ff8000",
    pilotos: ["Lando Norris", "Oscar Piastri"],
    motor: "Mercedes",
  },
  {
    nome: "Mercedes",
    cor: "#00a19c",
    pilotos: ["George Russell", "Kimi Antonelli"],
    motor: "Mercedes",
  },
  {
    nome: "Red Bull Racing",
    cor: "#3671c6",
    pilotos: ["Max Verstappen", "Isack Hadjar"],
    motor: "Red Bull Ford",
  },
  {
    nome: "Ferrari",
    cor: "#e80020",
    pilotos: ["Charles Leclerc", "Lewis Hamilton"],
    motor: "Ferrari",
  },
  {
    nome: "Williams",
    cor: "#1868db",
    pilotos: ["Carlos Sainz", "Alexander Albon"],
    motor: "Mercedes",
  },
  {
    nome: "Racing Bulls",
    cor: "#6692ff",
    pilotos: ["Liam Lawson", "Arvid Lindblad"],
    motor: "Red Bull Ford",
  },
  {
    nome: "Aston Martin",
    cor: "#00665e",
    pilotos: ["Fernando Alonso", "Lance Stroll"],
    motor: "Honda",
  },
  {
    nome: "Haas",
    cor: "#b6babd",
    pilotos: ["Esteban Ocon", "Oliver Bearman"],
    motor: "Ferrari",
  },
  {
    nome: "Audi",
    cor: "#e00020",
    pilotos: ["Nico Hulkenberg", "Gabriel Bortoleto"],
    motor: "Audi",
  },
  {
    nome: "Alpine",
    cor: "#0093cc",
    pilotos: ["Pierre Gasly", "Franco Colapinto"],
    motor: "Mercedes",
  },
  {
    nome: "Cadillac",
    cor: "#d6d6d6",
    pilotos: ["Sergio Perez", "Valtteri Bottas"],
    motor: "Ferrari",
  },
];

export default function Equipes() {
  return (
    <div className="equipes-pagina">
      <div className="equipes-cabecalho">
        <span className="equipes-etiqueta">TEMPORADA 2026</span>
        <h1>Equipes da Fórmula 1</h1>
        <p>Conheça as equipes e seus pilotos.</p>
      </div>

      <div className="equipes-resumo">
        <strong>11</strong>
        <span>Equipes no grid</span>
      </div>

      <div className="equipes-grid">
        {equipes.map((equipe) => (
          <article
            className="equipe-card"
            key={equipe.nome}
            style={{ "--cor-equipe": equipe.cor }}
          >
            <div className="equipe-linha" />

            <div className="equipe-conteudo">
              <span className="equipe-temporada">F1 2026</span>
              <h2>{equipe.nome}</h2>

              <div className="equipe-detalhes">
                <span>PILOTOS</span>
                {equipe.pilotos.map((piloto) => (
                  <p key={piloto}>🏎️ {piloto}</p>
                ))}
              </div>

              <div className="equipe-motor">
                <span>UNIDADE DE POTÊNCIA</span>
                <strong>{equipe.motor}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
