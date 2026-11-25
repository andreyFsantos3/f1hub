
import { useState, useEffect } from "react";
import "./Calendario.css";

const API_URL = "http://localhost:8080/api/calendario?ano=2026";


const bandeiras = {
  Australia: "🇦🇺",
  China: "🇨🇳",
  Japan: "🇯🇵",
  USA: "🇺🇸",
  United_States: "🇺🇸",
  Canada: "🇨🇦",
  Monaco: "🇲🇨",
  Spain: "🇪🇸",
  Austria: "🇦🇹",
  UK: "🇬🇧",
  United_Kingdom: "🇬🇧",
  Belgium: "🇧🇪",
  Hungary: "🇭🇺",
  Netherlands: "🇳🇱",
  Italy: "🇮🇹",
  Azerbaijan: "🇦🇿",
  Singapore: "🇸🇬",
  Mexico: "🇲🇽",
  Brazil: "🇧🇷",
  Qatar: "🇶🇦",
  UAE: "🇦🇪",
  "United Arab Emirates": "🇦🇪",
};

function obterCampo(objeto, campos, padrao = "") {
  for (const campo of campos) {
    if (objeto?.[campo] !== undefined && objeto[campo] !== null) {
      return objeto[campo];
    }
  }
  return padrao;
}

function normalizarCorridas(resposta) {
  const lista =
    Array.isArray(resposta) ? resposta :
    Array.isArray(resposta?.meetings) ? resposta.meetings :
    Array.isArray(resposta?.races) ? resposta.races :
    Array.isArray(resposta?.data) ? resposta.data :
    Array.isArray(resposta?.MRData?.RaceTable?.Races)
      ? resposta.MRData.RaceTable.Races
      : [];

  return lista.map((item, indice) => {
    const circuito = item.Circuit || item.circuit || {};

    const pais = obterCampo(
      item,
      ["pais", "country_name", "country", "countryName"],
      obterCampo(circuito, ["Location"], {}).country || "País não informado"
    );

    const inicio = obterCampo(
      item,
      ["inicio", "date_start", "date", "race_date", "dateStart"]
    );

    let fim = obterCampo(
      item,
      ["fim", "date_end", "dateEnd"],
      inicio
    );

    if (inicio && fim === inicio) {
      const dataFim = new Date(`${inicio}T12:00:00`);
      
      
      dataFim.setDate(dataFim.getDate() + 2);
      fim = dataFim.toISOString().slice(0, 10);
    }
   
    const codigoPais = obterCampo(
      item,
      ["country_code", "countryCode"],
      ""
    );

    const bandeira =
    bandeiras[codigoPais] ||
    bandeiras[pais.replaceAll(" ", "_")] ||
    "🏁";

    
    return {
      etapa: Number(obterCampo(
        item,
        ["etapa", "round", "meeting_number", "meeting_key"],
        indice + 1
      )),
      pais,
      bandeira,
      gp: obterCampo(
        item,
        ["gp", "meeting_name", "raceName", "meeting_official_name"],
        "Grande Prêmio"
      ),
      circuito: obterCampo(
        item,
        ["circuito", "circuit_short_name", "circuitName", "name"],
        circuito.circuitName || "Circuito não informado"
      ),
      cidade: obterCampo(
        item,
        ["cidade", "location", "locality"],
        circuito.Location?.locality || "Cidade não informada"
      ),
      inicio,
      fim,
    };
  }).filter(corrida => corrida.inicio);
}

function formatarData(data) {
  if (!data) return "--";

  return new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}


function converterData(data) {
  if (!data) return null;
const datas = data.split("T")
  const [ano, mes, dia] = datas[0].split("-").map(Number);
  
  

  return new Date(ano, mes - 1, dia);
}

function obterStatus(corrida) {

  
  if (!corrida.inicio || !corrida.fim) {
    return "Data inválida";
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const inicio = converterData(corrida.inicio);
  const fim = converterData(corrida.fim);


  if (!inicio || !fim ||
      isNaN(inicio.getTime()) ||
      isNaN(fim.getTime())) {
    return "Data inválida";
  }

  if (hoje > fim) {
    return "Realizada";
  }

  if (hoje >= inicio && hoje <= fim) {
    return "Em andamento";
  }

  return "Próxima";
}

export default function Calendario() {
  const [corridas, setCorridas] = useState([]);
  const [filtro, setFiltro] = useState("Todas");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarCalendario() {
      try {
        setCarregando(true);
        setErro("");

        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();
        const corridasConvertidas = normalizarCorridas(dados);

        if (corridasConvertidas.length === 0) {
          throw new Error(
            "A API respondeu, mas não encontramos corridas no formato esperado."
          );
        }

        setCorridas(corridasConvertidas);
      } catch (error) {
        console.error("Erro ao buscar calendário:", error);
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarCalendario();
  }, []);

  const corridasFiltradas = corridas.filter(corrida => {
    const status = obterStatus(corrida);

    if (filtro === "Todas") return true;
    if (filtro === "Próximas") return status === "Próxima";
    if (filtro === "Realizadas") return status === "Realizada";

    return true;
  });

  const proximaCorrida = corridas.find(
    corrida => obterStatus(corrida) === "Próxima"
  );

  if (carregando) {
    return (
      <main className="calendario-page">
        <h2>Carregando calendário da Fórmula 1...</h2>
      </main>
    );
  }

  if (erro) {
    return (
      <main className="calendario-page">
        <h2>Não foi possível carregar o calendário</h2>
        <p>{erro}</p>
        <button onClick={() => window.location.reload()}>
          Tentar novamente
        </button>
      </main>
    );
  }

  return (
    <main className="calendario-page">
      <header className="calendario-header">
        <div>
          <span className="calendario-etiqueta">
            F1 HUB / TEMPORADA 2026
          </span>
          <h1>Calendário</h1>
          <p>Acompanhe todas as etapas da temporada de Fórmula 1.</p>
        </div>

        <div className="temporada-ano">2026</div>
      </header>

      {proximaCorrida && (
        <section className="proxima-corrida">
          <div>
            <span className="calendario-etiqueta">PRÓXIMA CORRIDA</span>
            <h2>
              {proximaCorrida.bandeira} {proximaCorrida.gp}
            </h2>
            <p>
              {proximaCorrida.circuito} · {proximaCorrida.cidade}
            </p>
            <strong>
              {formatarData(proximaCorrida.inicio)} —{" "}
              {formatarData(proximaCorrida.fim)}
            </strong>
          </div>

          <span className="proxima-numero">
            {String(proximaCorrida.etapa).padStart(2, "0")}
          </span>
        </section>
      )}

      <div className="calendario-lista-header">
        <div>
          <h2>Etapas da temporada</h2>
          <p>{corridas.length} Grandes Prêmios no calendário</p>
        </div>

        <div className="calendario-filtros">
          {["Todas", "Próximas", "Realizadas"].map(opcao => (
            <button
              key={opcao}
              className={filtro === opcao ? "filtro-ativo" : ""}
              onClick={() => setFiltro(opcao)}
            >
              {opcao}
            </button>
          ))}
        </div>
      </div>

      <div className="corridas-grid">
        {corridasFiltradas.map(corrida => {
          const status = obterStatus(corrida);

          return (
            <article className="corrida-card" key={corrida.etapa}>
              <div className="corrida-topo">
                <span>
                  ETAPA {String(corrida.etapa).padStart(2, "0")}
                </span>

                <span
                  className={`status status-${status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {status}
                </span>
              </div>

              <div className="corrida-pais">
                <span className="corrida-bandeira">
                  {corrida.bandeira}
                </span>
                <span>{corrida.pais}</span>
              </div>

              <h3>{corrida.gp}</h3>
              <p className="corrida-circuito">{corrida.circuito}</p>

              <div className="corrida-rodape">
                <span>📍 {corrida.cidade}</span>
                <strong>
                  {formatarData(corrida.inicio)} –{" "}
                  {formatarData(corrida.fim)}
                </strong>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
