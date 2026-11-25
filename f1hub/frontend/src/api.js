
const API_URL = "/api";

export async function buscarDados(endpoint) {
  const resposta = await fetch(`${API_URL}${endpoint}`);

  if (!resposta.ok) {
    throw new Error(`Erro na API: HTTP ${resposta.status}`);
  }

  return resposta.json();
}
