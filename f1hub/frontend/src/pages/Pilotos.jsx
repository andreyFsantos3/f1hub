
import { useEffect, useMemo, useState } from "react";
import "./Pilotos.css";

const API_URL =
  "https://api.openf1.org/v1/drivers?session_key=latest";

// Países e bandeiras
const nacionalidades = {
  GBR: { pais: "Reino Unido", bandeira: "🇬🇧" },
  AUS: { pais: "Austrália", bandeira: "🇦🇺" },
  MON: { pais: "Mônaco", bandeira: "🇲🇨" },
  NED: { pais: "Países Baixos", bandeira: "🇳🇱" },
  FRA: { pais: "França", bandeira: "🇫🇷" },
  ITA: { pais: "Itália", bandeira: "🇮🇹" },
  ESP: { pais: "Espanha", bandeira: "🇪🇸" },
  CAN: { pais: "Canadá", bandeira: "🇨🇦" },
  ARG: { pais: "Argentina", bandeira: "🇦🇷" },
  GER: { pais: "Alemanha", bandeira: "🇩🇪" },
  BRA: { pais: "Brasil", bandeira: "🇧🇷" },
  THA: { pais: "Tailândia", bandeira: "🇹🇭" },
  NZL: { pais: "Nova Zelândia", bandeira: "🇳🇿" },
  MEX: { pais: "México", bandeira: "🇲🇽" },
  FIN: { pais: "Finlândia", bandeira: "🇫🇮" },
  CHN: { pais: "China", bandeira: "🇨🇳" },
  JPN: { pais: "Japão", bandeira: "🇯🇵" },
  USA: { pais: "Estados Unidos", bandeira: "🇺🇸" },
  DEN: { pais: "Dinamarca", bandeira: "🇩🇰" },
  SUI: { pais: "Suíça", bandeira: "🇨🇭" },
  POL: { pais: "Polônia", bandeira: "🇵🇱" },
  BEL: { pais: "Bélgica", bandeira: "🇧🇪" },
};

// Associação entre sigla do piloto e código do país
// Usada quando a API não fornece country_code
const nacionalidadesPorSigla = {
  NOR: "GBR",
  PIA: "AUS",
  LEC: "MON",
  HAM: "GBR",
  VER: "NED",
  HAD: "FRA",
  RUS: "GBR",
  ANT: "ITA",
  ALO: "ESP",
  STR: "CAN",
  GAS: "FRA",
  COL: "ARG",
  OCO: "FRA",
  BEA: "GBR",
  HUL: "GER",
  BOR: "BRA",
  SAI: "ESP",
  ALB: "THA",
  LAW: "NZL",
  LIN: "GBR",
  PER: "MEX",
  BOT: "FIN",
};

function iniciais(nome = "") {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("");
}

export default function Pilotos() {
  const [pilotos, setPilotos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [equipeSelecionada, setEquipeSelecionada] =
    useState("Todas");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Busca os pilotos na OpenF1
  async function buscarPilotos() {
    try {
      setCarregando(true);
      setErro("");

      const resposta = await fetch(API_URL);

      if (!resposta.ok) {
        throw new Error(
          "Não foi possível consultar a API OpenF1."
        );
      }

      const dados = await resposta.json();

      if (!Array.isArray(dados) || dados.length === 0) {
        throw new Error(
          "Nenhum piloto foi encontrado na sessão mais recente."
        );
      }

      // Evita pilotos duplicados
      const unicos = Array.from(
        new Map(
          dados.map((piloto) => [
            piloto.driver_number,
            piloto,
          ])
        ).values()
      );

      // Organiza os dados de cada piloto
      const pilotosOrganizados = unicos
        .map((piloto) => {
          const codigoPais =
            piloto.country_code ||
            nacionalidadesPorSigla[piloto.name_acronym];

          const nacionalidade = nacionalidades[codigoPais] || {
            pais: "Não informado",
            bandeira: "🏁",
          };

          return {
            id: piloto.driver_number,
            nome:
              piloto.full_name ||
              `${piloto.first_name || ""} ${piloto.last_name || ""}`.trim() ||
              "Piloto não identificado",
            numero: piloto.driver_number,
            equipe: piloto.team_name || "Equipe não informada",
            foto: piloto.headshot_url || "",
            sigla: piloto.name_acronym || "",
            cor: piloto.team_colour
              ? `#${piloto.team_colour}`
              : "#e10600",
            pais: nacionalidade.pais,
            bandeira: nacionalidade.bandeira,
          };
        })
        .sort((a, b) => a.numero - b.numero);

      setPilotos(pilotosOrganizados);
    } catch (error) {
      console.error("Erro ao buscar pilotos:", error);
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarPilotos();
  }, []);

  // Filtros automáticos das equipes
  const equipes = useMemo(() => {
    return [
      "Todas",
      ...new Set(pilotos.map((piloto) => piloto.equipe)),
    ];
  }, [pilotos]);

  // Pesquisa por nome, equipe ou país
  const pilotosFiltrados = pilotos.filter((piloto) => {
    const termo = pesquisa.toLowerCase();

    const correspondePesquisa =
      piloto.nome.toLowerCase().includes(termo) ||
      piloto.equipe.toLowerCase().includes(termo) ||
      piloto.pais.toLowerCase().includes(termo);

    const correspondeEquipe =
      equipeSelecionada === "Todas" ||
      piloto.equipe === equipeSelecionada;

    return correspondePesquisa && correspondeEquipe;
  });

  // Identifica o piloto brasileiro
  const destaqueBrasileiro = pilotos.find(
    (piloto) => piloto.pais === "Brasil"
  );

  // Tela de carregamento
  if (carregando) {
    return (
      <main className="pilotos-page">
        <div className="pilotos-estado">
          <div className="loader-pilotos"></div>
          <h2>Carregando grid da Fórmula 1...</h2>
          <p>Buscando pilotos, equipes e fotografias.</p>
        </div>
      </main>
    );
  }

  // Tela de erro
  if (erro) {
    return (
      <main className="pilotos-page">
        <div className="pilotos-estado">
          <h2>Não foi possível carregar os pilotos</h2>
          <p>{erro}</p>

          <button
            className="botao-atualizar"
            onClick={buscarPilotos}
          >
            Tentar novamente
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="pilotos-page">

      {/* CABEÇALHO */}
      <header className="pilotos-header">
        <div>
          <span className="pilotos-eyebrow">
            F1 HUB / GRID DA TEMPORADA
          </span>

          <h1>Pilotos</h1>

          <p>
            Conheça os competidores, suas equipes e informações
            da Fórmula 1.
          </p>
        </div>

        <div className="pilotos-total">
          <strong>{pilotos.length}</strong>
          <span>PILOTOS</span>
        </div>
      </header>

      {/* DESTAQUE BRASILEIRO */}
      {destaqueBrasileiro && (
        <section
          className="pilotos-destaque"
          style={{
            "--cor-destaque": destaqueBrasileiro.cor,
          }}
        >
          <div className="destaque-texto">
            <span className="pilotos-eyebrow">
              DESTAQUE BRASILEIRO
            </span>

            <h2>
              🇧🇷 {destaqueBrasileiro.nome}
            </h2>

            <p>
              Representando o Brasil na Fórmula 1.
            </p>

            <strong>
              {destaqueBrasileiro.equipe.toUpperCase()}
              {" · CARRO "}
              {String(destaqueBrasileiro.numero).padStart(2, "0")}
            </strong>
          </div>

          {destaqueBrasileiro.foto && (
            <img
              src={destaqueBrasileiro.foto}
              alt={destaqueBrasileiro.nome}
              className="destaque-foto"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          )}

          <span className="destaque-numero">
            {String(destaqueBrasileiro.numero).padStart(2, "0")}
          </span>
        </section>
      )}

      {/* PESQUISA E FILTROS */}
      <section className="pilotos-controles">
        <input
          type="text"
          placeholder="Pesquisar piloto, equipe ou país..."
          value={pesquisa}
          onChange={(event) =>
            setPesquisa(event.target.value)
          }
        />

        <select
          value={equipeSelecionada}
          onChange={(event) =>
            setEquipeSelecionada(event.target.value)
          }
        >
          {equipes.map((equipe) => (
            <option key={equipe} value={equipe}>
              {equipe === "Todas"
                ? "Todas as equipes"
                : equipe}
            </option>
          ))}
        </select>

        <button
          className="botao-atualizar"
          onClick={buscarPilotos}
        >
          Atualizar
        </button>
      </section>

      {/* TÍTULO DA LISTA */}
      <div className="pilotos-lista-titulo">
        <div>
          <h2>Grid da temporada</h2>
          <p>
            {pilotosFiltrados.length} pilotos encontrados
          </p>
        </div>

        <span className="dados-api">
          <span className="ponto-online"></span>
          DADOS OPENF1
        </span>
      </div>

      {/* CARDS DOS PILOTOS */}
      <section className="pilotos-grid">
        {pilotosFiltrados.map((piloto) => (
          <article
            className="piloto-card"
            key={piloto.id}
            style={{
              "--cor-equipe": piloto.cor,
            }}
          >
            <div className="piloto-card-topo">
              <span>{piloto.equipe}</span>

              <span className="piloto-numero">
                {String(piloto.numero).padStart(2, "0")}
              </span>
            </div>

            <div className="piloto-imagem-area">
              <div className="piloto-iniciais">
                {iniciais(piloto.nome)}
              </div>

              {piloto.foto && (
                <img
                  src={piloto.foto}
                  alt={`Foto de ${piloto.nome}`}
                  className="piloto-foto"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              )}
            </div>

            <div className="piloto-identificacao">
              <span className="piloto-sigla">
                {piloto.sigla}
              </span>

              <h3>{piloto.nome}</h3>

              <div className="piloto-pais">
                <span>{piloto.bandeira}</span>
                {piloto.pais}
              </div>
            </div>

            <div className="piloto-card-rodape">
              <span>FORMULA 1</span>
              <span>#{piloto.numero}</span>
            </div>
          </article>
        ))}
      </section>

      {/* NENHUM RESULTADO */}
      {pilotosFiltrados.length === 0 && (
        <p className="pilotos-vazio">
          Nenhum piloto encontrado.
        </p>
      )}

      <footer className="pilotos-footer">
        Informações fornecidas pela OpenF1.
      </footer>

    </main>
  );
}
