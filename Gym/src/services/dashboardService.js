const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');

export class ErroDashboard extends Error {
  constructor(message, tipo = 'erro') {
    super(message);
    this.name = 'ErroDashboard';
    this.tipo = tipo;
  }
}

/**
 * Busca os dados reais do dashboard.
 * O contrato GET /api/dashboard?weekStart=YYYY-MM-DD precisa ser implementado pelo backend.
 */
export async function buscarDashboard(weekStart, signal) {
  if (!API_BASE_URL) {
    return {
      status: 'indisponivel',
      mensagem: 'A conexão com os dados de treino ainda não está configurada.',
    };
  }

  let resposta;
  try {
    resposta = await fetch(
      `${API_BASE_URL}/api/dashboard?weekStart=${encodeURIComponent(weekStart)}`,
      { headers: { Accept: 'application/json' }, signal },
    );
  } catch (erro) {
    if (erro.name === 'AbortError') throw erro;
    return {
      status: 'indisponivel',
      mensagem: 'Não foi possível conectar à API de treinos.',
    };
  }

  if (resposta.status === 404) {
    return {
      status: 'indisponivel',
      mensagem: 'A rota GET /api/dashboard ainda não está disponível no backend.',
    };
  }

  if (!resposta.ok) {
    throw new ErroDashboard(`A API respondeu com o status ${resposta.status}.`);
  }

  const dados = await resposta.json();
  const datasEsperadas = Array.from({ length: 7 }, (_, indice) => {
    const data = new Date(`${weekStart}T00:00:00Z`);
    data.setUTCDate(data.getUTCDate() + indice);
    return data.toISOString().slice(0, 10);
  });
  if (
    !dados
    || dados.weekStart !== weekStart
    || !Array.isArray(dados.days)
    || dados.days.length !== 7
    || !Array.isArray(dados.recentSessions)
    || datasEsperadas.some((data) => !dados.days.some((dia) => dia?.date === data))
    || dados.recentSessions.some((sessao) => (
      !sessao?.id
      || !sessao.workoutName
      || !Number.isFinite(Date.parse(sessao.completedAt))
    ))
  ) {
    throw new ErroDashboard('A resposta da API não corresponde ao contrato esperado.');
  }

  return { status: 'pronto', dados };
}
