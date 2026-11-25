
import { useState, useEffect } from "react";
import "./DestaquesCorridas.css";

const API_URL = "http://localhost:8080/api/calendario?ano=2026";

// Corridas históricas selecionadas manualmente.
// Você poderá adicionar outras posteriormente.
const destaques = [
  {
    gp: "GP do Brasil",
    ano: "2008",
    titulo: "Uma decisão histórica",
    descricao:
      "Uma das decisões de campeonato mais emocionantes da história da Fórmula 1.",
    etiqueta: "CORRIDA MARCANTE",
  },
  {
    gp: "GP da Alemanha",
    ano: "2019",
    titulo: "Chuva e muita emoção",
    descricao:
      "Uma corrida imprevisível, com acidentes, ultrapassagens e reviravoltas.",
    etiqueta: "CORRIDA MARCANTE",
  },
  {
    gp: "GP do Brasil",
    ano: "2021",
    titulo: "Uma disputa inesquecível",
    descricao:
      "Uma das grandes disputas da temporada, marcada por ultrapassagens.",
    etiqueta: "CORRIDA MARCANTE",
  },
];

function extrairLista(dados) {
  if (Array.isArray(dados)) return dados;
  return dados?.races ||
    dados?.meetings ||
    dados?.data ||
    dados?.MRData?.RaceTable?.Races ||
    [];
}

function criarData(data) {
  if (!data) return null;

  const texto = String(data).slice(0, 10);
  const [ano, mes, dia] = texto.split("-").map(Number);

  if (!ano || !mes || !dia) return null;

  const resultado = new Date(ano, mes - 1, dia);

  return resultado.getFullYear() === ano &&
    resultado.getMonth() === mes - 1 &&
    resultado.getDate() === dia
    ? resultado
    : null;
}

function formatarData(data) {
  const dataConvertida = criarData(data);

  if (!dataConvertida) return "--";

  return dataConvertida.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function extrairCorrida(item, indice) {
  const circuito = item.Circuit || item.circuit || {};
  const localizacao = circuito.Location || {};

  return {
    etapa: item.etapa ?? item.round ?? indice + 1,
    gp:
      item.gp ||
      item.meeting_name ||
      item.raceName ||
      "Grande Prêmio",
    pais:
      item.pais ||
      item.country_name ||
      item.country ||
      localizacao.country ||
      "País não informado",
    circuito:
      item.circuito ||
      item.circuit_short_name ||
      item.circuitName ||
      "Circuito não informado",
    cidade:
      item.cidade ||
      item.location ||
      item.locality ||
      localizacao.locality ||
      "Cidade não informada",
    inicio:
      item.inicio ||
      item.date_start ||
      item.date ||
      item.race_date,
    fim:
      item.fim ||
      item.date_end ||
      item.inicio ||
      item.date_start ||
      item.date,
  };
}

export default function DestaquesCorridas() {
  const [corridas, setCorridas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [agora, setAgora] = useState(Date.now());
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
          throw new Error("Não foi possível carregar as corridas.");
        }

        const dados = await resposta.json();

        const lista = extrairLista(dados)
          .map(extrairCorrida)
          .filter(corrida => criarData(corrida.inicio))
          .sort(
            (a, b) =>
              criarData(a.inicio) - criarData(b.inicio)
          );

        setCorridas(lista);
      } catch (error) {
        setErro(error.message);
      }
    }

    carregar();
  }, []);

  // Atualiza a contagem regressiva a cada segundo.
  useEffect(() => {
    const intervalo = setInterval(() => {
      setAgora(Date.now());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const proximas = corridas.filter(corrida => {
    const inicio = criarData(corrida.inicio);
    return inicio && inicio >= hoje;
  });

  const proxima = proximas[0];

  const slides = [
    ...(proxima ? [{ tipo: "proxima", corrida: proxima }] : []),
    ...destaques.map(item => ({ tipo: "destaque", corrida: item })),
  ];

  // Faz os cards passarem automaticamente.
  useEffect(() => {
    if (slides.length < 2) return;

    const intervalo = setInterval(() => {
      setIndice(atual => (atual + 1) % slides.length);
    }, 7000);

    return () => clearInterval(intervalo);
  }, [slides.length]);

  if (erro) {
    return <p className="erro-destaques">{erro}</p>;
  }

  if (!corridas.length) {
    return (
      <section className="destaques-f1">
        Carregando destaques da Fórmula 1...
      </section>
    );
  }

  if (!slides.length) return null;

  const slide = slides[indice % slides.length];

  function calcularTempo(data) {
    const destino = criarData(data);

    if (!destino) return null;

    const diferenca = Math.max(0, destino.getTime() - agora);

    return {
      dias: Math.floor(diferenca / 86400000),
      horas: Math.floor((diferenca / 3600000) % 24),
      minutos: Math.floor((diferenca / 60000) % 60),
      segundos: Math.floor((diferenca / 1000) % 60),
    };
  }

  const tempo =
    slide.tipo === "proxima"
      ? calcularTempo(slide.corrida.inicio)
      : null;

  const corrida = slide.corrida;

  function mudarSlide(direcao) {
    setIndice(atual =>
      (atual + direcao + slides.length) % slides.length
    );
  }

  return (
    <section className="destaques-f1">
      <div className="destaques-topo">
        <div>
          <span className="destaques-etiqueta">
            F1 HUB / RACE CENTER
          </span>
          <h2>Destaques da Fórmula 1</h2>
        </div>

        <span className="destaques-temporada">2026</span>
      </div>

      <div className="destaque-banner">
        <div className="destaque-conteudo">

          {slide.tipo === "proxima" ? (
            <>
              <span className="destaque-tag">
                PRÓXIMA CORRIDA
              </span>

              <h1>{corrida.gp}</h1>

              <p>
                {corrida.circuito} · {corrida.cidade},{" "}
                {corrida.pais}
              </p>

              <strong>
                {formatarData(corrida.inicio)}
              </strong>

              <div className="contagem-regressiva">
                <span>CONTAGEM REGRESSIVA</span>

                <div className="contador-numeros">
                  <div>
                    <strong>{tempo.dias}</strong>
                    <small>DIAS</small>
                  </div>

                  <div>
                    <strong>
                      {String(tempo.horas).padStart(2, "0")}
                    </strong>
                    <small>HORAS</small>
                  </div>

                  <div>
                    <strong>
                      {String(tempo.minutos).padStart(2, "0")}
                    </strong>
                    <small>MIN</small>
                  </div>

                  <div>
                    <strong>
                      {String(tempo.segundos).padStart(2, "0")}
                    </strong>
                    <small>SEG</small>
                  </div>
                </div>

                <small>Contagem até o dia da corrida</small>
              </div>
            </>
          ) : (
            <>
              <span className="destaque-tag">
                {corrida.etiqueta}
              </span>

              <h1>{corrida.gp}</h1>

              <h2>{corrida.titulo}</h2>

              <p>{corrida.descricao}</p>

              <strong>Temporada {corrida.ano}</strong>
            </>
          )}
        </div>

        <div className="destaque-controles">
          <button onClick={() => mudarSlide(-1)}>
            ❮
          </button>

          <span>
            {indice + 1} / {slides.length}
          </span>

          <button onClick={() => mudarSlide(1)}>
            ❯
          </button>
        </div>
      </div>

      <div className="destaque-indicadores">
        {slides.map((item, i) => (
          <button
            key={`${item.tipo}-${i}`}
            className={indice === i ? "indicador ativo" : "indicador"}
            onClick={() => setIndice(i)}
            aria-label={`Mostrar destaque ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
