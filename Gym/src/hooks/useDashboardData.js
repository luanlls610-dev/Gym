import { useEffect, useState } from 'react';
import { buscarDashboard } from '../services/dashboardService';
import { obterSemana } from '../utils/datas';

const estadoInicial = { status: 'carregando', dados: null, mensagem: '' };

/** Carrega os dados da semana e evita atualizar a tela após desmontar o componente. */
export function useDashboardData() {
  const [estado, setEstado] = useState(estadoInicial);

  useEffect(() => {
    const controller = new AbortController();
    const [weekStart] = obterSemana();

    buscarDashboard(weekStart, controller.signal)
      .then((resultado) => {
        if (resultado.status === 'indisponivel') {
          setEstado({ status: resultado.status, dados: null, mensagem: resultado.mensagem });
          return;
        }
        setEstado({ status: 'pronto', dados: resultado.dados, mensagem: '' });
      })
      .catch((erro) => {
        if (erro.name !== 'AbortError') {
          setEstado({
            status: 'erro',
            dados: null,
            mensagem: erro.message || 'Ocorreu um erro ao carregar o dashboard.',
          });
        }
      });

    return () => controller.abort();
  }, []);

  return estado;
}
