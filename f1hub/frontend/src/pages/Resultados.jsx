
import { useEffect, useState } from "react";
import "./Resultados.css";

const API_BASE = "https://api.openf1.org/v1";
const ANO = 2026;

export default function Resultados() {
  const [aba, setAba] = useState("pilotos");
  const [pilotos, setPilotos] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [ultimaCorrida, setUltimaCorrida] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function buscarResultados() {
      try {
        setCarregando(true);
        setErro("");

        // 1. Busca as corridas da temporada
        const respostaSessoes = await fetch(
          `${API_BASE}/sessions?year=${ANO}&session_type=Race`
        );

        if (!respostaSessoes.ok) {
          throw new Error("Não foi possível buscar as corridas.");
        }

        const sessoes = await respostaSessoes.json();

        // 2. Identifica a última corrida que já terminou
        const agora = new Date();

        const corridasFinalizadas = sessoes
          .filter((corrida) => {
            return (
              corrida.date_end &&
              new Date(corrida.date_end) <= agora
            );
          })
          .sort(
            (a, b) =>
              new Date(b.date_end) - new Date(a.date_end)
          );

        if (corridasFinalizadas.length === 0) {
          throw new Error(
            "Ainda não existem corridas finalizadas disponíveis para esta temporada."
          );
        }

        const ultima = corridasFinalizadas[0];

        // 3. Busca classificação de pilotos, equipes e cadastro dos pilotos
        const [respostaPilotos, respostaEquipes, respostaDadosPilotos] =
          await Promise.all([
            fetch(
              `${API_BASE}/championship_drivers?session_key=${ultima.session_key}`
            ),
            fetch(
              `${API_BASE}/championship_teams?session_key=${ultima.session_key}`
            ),
            fetch(
              `${API_BASE}/drivers?session_key=${ultima.session_key}`
            ),
          ]);

        if (
          !respostaPilotos.ok ||
          !respostaEquipes.ok ||
          !respostaDadosPilotos.ok
        ) {
          throw new Error("Erro ao consultar a classificação na OpenF1.");
        }

        const classificacaoPilotos = await respostaPilotos.json();
        const classificacaoEquipes = await respostaEquipes.json();
        const dadosPilotos = await respostaDadosPilotos.json();

        // 4. Relaciona os pontos com os nomes e equipes dos pilotos
        const pilotosComDados = classificacaoPilotos
          .map((item) => {
            const dados = dadosPilotos.find(
              (piloto) =>
                piloto.driver_number === item.driver_number
            );

            return {
              posicao: item.position_current,
              numero: item.driver_number,
              piloto:
                dados?.full_name ||
                `Piloto ${item.driver_number}`,
              equipe: dados?.team_name || "Equipe não informada",
              pontos: item.points_current,
              foto: dados?.headshot_url,
              cor: dados?.team_colour
                ? `#${dados.team_colour}`
                : "#888888",
            };
          })
          .sort((a, b) => a.posicao - b.posicao);

        // 5. Organiza a classificação das equipes
        const equipesOrdenadas = classificacaoEquipes
          .map((item) => ({
            posicao: item.position_current,
            equipe: item.team_name,
            pontos: item.points_current,
          }))
          .sort((a, b) => a.posicao - b.posicao);

        if (ativo) {
          setPilotos(pilotosComDados);
          setEquipes(equipesOrdenadas);
          setUltimaCorrida(ultima.session_name);
        }
      } catch (error) {
        if (ativo) {
          setErro(error.message);
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    buscarResultados();

    return () => {
      ativo = false;
    };
  }, []);

  return (
    <div className="resultados-pagina">
      <div className="resultados-cabecalho">
        <span>TEMPORADA {ANO}</span>
        <h1>Resultados e classificação</h1>
        <p>Acompanhe a disputa pelo campeonato.</p>

        {ultimaCorrida && (
          <small>
            Resultado atualizado 
          </small>
        )}
      </div>

      <div className="resultados-abas">
        <button
          className={aba === "pilotos" ? "selecionada" : "semSelecionar"}
          onClick={() => setAba("pilotos")}
        >
          Pilotos
        </button>

        <button
          className={aba === "equipes" ? "selecionada" : "semSelecionar"}
          onClick={() => setAba("equipes")}
        >
          Equipes
        </button>
      </div>

      {carregando ? (
        <div className="resultados-carregando">
          <p>Carregando classificação da Fórmula 1...</p>
        </div>
      ) : erro ? (
        <div className="resultados-erro">
          <p>{erro}</p>
          <button onClick={() => window.location.reload()}>
            Tentar novamente
          </button>
        </div>
      ) : aba === "pilotos" ? (
        <div className="tabela-resultados">
          <h2>Campeonato de pilotos</h2>

          {pilotos.length === 0 ? (
            <p>Não há classificação de pilotos disponível.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>POS.</th>
                  <th>PILOTO</th>
                  <th>EQUIPE</th>
                  <th>PONTOS</th>
                </tr>
              </thead>

              <tbody>
                {pilotos.map((item) => (
                  <tr key={item.numero}>
                    <td className="posicao-piloto">
                      {item.posicao}
                    </td>

                    <td>
                      <div className="resultado-piloto">
                        {item.foto && (
                          <img
                            src={item.foto}
                            alt={item.piloto}
                          />
                        )}
                        <span>{item.piloto}</span>
                      </div>
                    </td>

                    <td>
                      <span
                        className="cor-equipe"
                        style={{
                          backgroundColor: item.cor,
                        }}
                      />
                      {item.equipe}
                    </td>

                    <td className="pontos-piloto">
                      {item.pontos}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="tabela-resultados">
          <h2>Campeonato de construtores</h2>

          {equipes.length === 0 ? (
            <p>Não há classificação de equipes disponível.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>POS.</th>
                  <th>EQUIPE</th>
                  <th>PONTOS</th>
                </tr>
              </thead>

              <tbody>
                {equipes.map((item) => (
                  <tr key={item.equipe}>
                    <td className="posicao-piloto">
                      {item.posicao}
                    </td>

                    <td>{item.equipe}</td>

                    <td className="pontos-piloto">
                      {item.pontos}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
