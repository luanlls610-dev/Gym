import { useMemo, useState } from 'react';
import { EstadoDashboard } from './estado_dashboard';
import { useDashboardData } from '../hooks/useDashboardData';
import {
  formatarDataLonga,
  formatarDiaMes,
  formatarDiaSemana,
  formatarDuracao,
  obterSaudacao,
  obterSemana,
  paraDataISO,
} from '../utils/datas';
import './meus_treinos.css';

function prepararDia(dia, data, status) {
  if (status !== 'pronto') {
    return { date: data, workout: null, session: null, isRestDay: false, status };
  }
  return {
    ...dia,
    workout: dia.workout || null,
    session: dia.session || null,
    isRestDay: Boolean(dia.isRestDay),
    status,
  };
}

function formatarQuantidade(valor, singular, plural = `${singular}s`) {
  return `${valor} ${valor === 1 ? singular : plural}`;
}

function exibirContagemExercicios(valor) {
  return Number.isFinite(valor)
    ? formatarQuantidade(valor, 'exercício')
    : 'Contagem não informada';
}

export function MeusTreinos() {
  const { status, dados, mensagem } = useDashboardData();
  const diasSemana = useMemo(() => {
    const datas = obterSemana();
    const diasApi = new Map((dados?.days || []).map((dia) => [dia.date, dia]));
    return datas.map((data) => prepararDia(diasApi.get(data), data, status));
  }, [dados, status]);

  const hoje = paraDataISO(new Date());
  const [dataSelecionada, setDataSelecionada] = useState(hoje);
  const diaSelecionado = diasSemana.find((dia) => dia.date === dataSelecionada) || diasSemana[0];
  const sessoes = dados?.recentSessions || [];
  const treinosPlanejados = dados?.days?.filter((dia) => dia.workout) || [];
  const treinosConcluidos = treinosPlanejados.filter((dia) => dia.session).length;
  const proximoTreino = treinosPlanejados
    .filter((dia) => dia.date >= hoje && !dia.session)
    .sort((a, b) => a.date.localeCompare(b.date))[0] || null;
  const minutosAtivos = treinosPlanejados.reduce(
    (total, dia) => total + (dia.session?.durationMinutes || 0),
    0,
  );
  const minutosPorDia = diasSemana.map((dia) => dia.session?.durationMinutes || 0);
  const maiorDuracao = Math.max(...minutosPorDia, 0);
  const progresso = treinosPlanejados.length
    ? Math.round((treinosConcluidos / treinosPlanejados.length) * 100)
    : 0;

  function renderEstado(mensagemVazia) {
    if (status === 'carregando') {
      return <EstadoDashboard tipo="carregando" titulo="Carregando seus treinos…" />;
    }
    if (status === 'indisponivel') {
      return <EstadoDashboard tipo="indisponivel" titulo="Dados de treino indisponíveis">{mensagem}</EstadoDashboard>;
    }
    if (status === 'erro') {
      return <EstadoDashboard tipo="erro" titulo="Não foi possível carregar os treinos">{mensagem}</EstadoDashboard>;
    }
    return <EstadoDashboard tipo="vazio" titulo={mensagemVazia} />;
  }

  const cabecalhoDia = dataSelecionada === hoje
    ? 'Treino de hoje'
    : `Treino de ${formatarDiaSemana(dataSelecionada).toLowerCase()}, ${formatarDiaMes(dataSelecionada)}`;

  return (
    <div className="pagina pagina-treinos">
      <header className="topo-pagina">
        <div>
          <span className="sobretitulo">{formatarDataLonga().toUpperCase()}</span>
          <h1>{obterSaudacao()}, atleta.</h1>
          <p>Consistência é o que transforma esforço em resultado.</p>
        </div>
      </header>

      {status === 'indisponivel' && (
        <EstadoDashboard
          tipo="indisponivel"
          titulo="Seus indicadores ainda não estão conectados"
        >
          {mensagem} Nenhum resultado está sendo estimado ou registrado nesta tela.
        </EstadoDashboard>
      )}
      {status === 'erro' && renderEstado('')}

      <section className="resumo-grid" aria-label="Resumo da semana">
        <article className="cartao resumo-cartao">
          <span className="resumo-icone vermelho" aria-hidden="true">↗</span>
          <strong className="numero-resumo">
            {status === 'pronto' ? (
              <>{formatarQuantidade(treinosConcluidos, 'treino')}<span>/ {treinosPlanejados.length} programados</span></>
            ) : '—'}
          </strong>
          <span className="rotulo-resumo">treinos concluídos nesta semana</span>
          {status === 'pronto' && treinosPlanejados.length > 0 && (
            <div
              className="barra-progresso"
              role="progressbar"
              aria-label="Progresso semanal dos treinos"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={progresso}
            >
              <span style={{ width: `${progresso}%` }} />
            </div>
          )}
        </article>

        <article className="cartao resumo-cartao">
          <span className="resumo-icone laranja" aria-hidden="true">◷</span>
          <strong className="numero-resumo">
            {status === 'pronto' ? formatarDuracao(minutosAtivos) : '—'}
          </strong>
          <span className="rotulo-resumo">tempo de atividade registrado</span>
          <div className="mini-barras" aria-label="Atividade diária registrada nesta semana">
            {minutosPorDia.map((minutos, indice) => (
              <i
                key={diasSemana[indice].date}
                className={minutos ? 'mini-barra-com-atividade' : ''}
                aria-hidden="true"
                style={{ height: minutos && maiorDuracao ? `${Math.max(12, (minutos / maiorDuracao) * 100)}%` : '12%' }}
              />
            ))}
          </div>
        </article>

        <article className="cartao proximo-card" aria-label="Próximo treino">
          <span className="sobretitulo">PRÓXIMO TREINO</span>
          {status === 'pronto' && proximoTreino ? (
            <>
              <strong className="proximo-card__nome">{proximoTreino.workout.name}</strong>
              <span className="proximo-card__data">{formatarDiaSemana(proximoTreino.date)}, {formatarDiaMes(proximoTreino.date)}</span>
              <span className="proximo-card__duracao">
                {Number.isFinite(proximoTreino.workout.estimatedDurationMinutes)
                  ? `~${formatarDuracao(proximoTreino.workout.estimatedDurationMinutes)}`
                  : 'Duração não informada'}
              </span>
            </>
          ) : (
            <>
              <strong className="proximo-card__nome">{status === 'pronto' ? 'Sem treino futuro programado' : '—'}</strong>
              <span className="proximo-card__data">
                {status === 'pronto' ? 'Consulte sua agenda semanal' : 'Aguardando dados da API'}
              </span>
            </>
          )}
        </article>
      </section>

      <section className="secao-agenda" aria-labelledby="titulo-agenda">
        <div className="cabecalho-secao">
          <div>
            <span className="sobretitulo">PLANEJAMENTO</span>
            <h2 id="titulo-agenda">Sua semana</h2>
          </div>
        </div>
        {status === 'pronto' && treinosPlanejados.length === 0 && (
          <p className="agenda-nota">Nenhum treino programado para esta semana.</p>
        )}
        <div className="agenda-semanal" role="group" aria-label="Selecione um dia para ver o treino">
          {diasSemana.map((dia) => {
            const selecionado = dia.date === dataSelecionada;
            const estado = dia.session ? 'feito' : dia.workout ? 'futuro' : dia.isRestDay ? 'descanso' : 'sem-dados';
            return (
              <button
                key={dia.date}
                type="button"
                className={`dia-card ${selecionado ? 'dia-selecionado' : ''}`}
                aria-pressed={selecionado}
                aria-label={`${formatarDiaSemana(dia.date)}, ${formatarDiaMes(dia.date)}: ${status === 'indisponivel' ? 'dados indisponíveis' : dia.workout?.name || (dia.isRestDay ? 'descanso' : 'sem treino programado')}`}
                onClick={() => setDataSelecionada(dia.date)}
              >
                <span className="dia-label">{formatarDiaSemana(dia.date)}</span>
                <strong className="dia-numero">{converterNumeroDia(dia.date)}</strong>
                <span className={`dia-marcador ${estado}`} aria-hidden="true" />
                <span className="dia-detalhe">
                  <strong>{dia.workout?.name || (dia.isRestDay ? 'Descanso' : status === 'pronto' ? 'Sem treino' : 'Sem dados')}</strong>
                  <span>{dia.session ? 'Concluído' : dia.workout ? exibirContagemExercicios(dia.workout.exerciseCount) : dia.isRestDay ? 'Recuperação' : '—'}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="secao-treino-hoje" aria-labelledby="titulo-treino-selecionado">
        <div className="cabecalho-secao">
          <div>
            <span className="sobretitulo">AGENDA SEMANAL</span>
            <h2 id="titulo-treino-selecionado">{cabecalhoDia}</h2>
          </div>
        </div>
        {status === 'carregando' && renderEstado('')}
        {status === 'indisponivel' && (
          <EstadoDashboard tipo="indisponivel" titulo="Conecte a API para consultar o treino deste dia">
            Este módulo não possui dados locais de treino.
          </EstadoDashboard>
        )}
        {status === 'erro' && null}
        {status === 'pronto' && diaSelecionado?.workout && (
          <article className="cartao treino-destaque">
            <div className="treino-ilustracao" aria-hidden="true">
              <span>{String(diaSelecionado.workout.exerciseCount || 0).padStart(2, '0')}</span>
              <div className="orb orb-um" />
              <div className="orb orb-dois" />
              <div className="linha-grafica" />
            </div>
            <div className="treino-info">
              <span className="tag tag-vermelha">{diaSelecionado.session ? 'CONCLUÍDO' : 'PROGRAMADO'}</span>
              <h3>{diaSelecionado.workout.name}</h3>
              <p>{diaSelecionado.workout.focus || 'Treino programado para este dia.'}</p>
              <div className="treino-metadados">
                <span>{exibirContagemExercicios(diaSelecionado.workout.exerciseCount)}</span>
                <span>{Number.isFinite(diaSelecionado.workout.estimatedDurationMinutes) ? `~${formatarDuracao(diaSelecionado.workout.estimatedDurationMinutes)}` : 'Duração não informada'}</span>
                {diaSelecionado.session?.durationMinutes > 0 && (
                  <span>Realizado em {formatarDuracao(diaSelecionado.session.durationMinutes)}</span>
                )}
              </div>
            </div>
          </article>
        )}
        {status === 'pronto' && !diaSelecionado?.workout && (
          <EstadoDashboard
            tipo="vazio"
            titulo={diaSelecionado?.isRestDay ? 'Dia de descanso' : 'Nenhum treino programado para este dia'}
          >
            {diaSelecionado?.isRestDay
              ? 'A recuperação também faz parte do planejamento.'
              : 'Escolha outro dia da semana ou cadastre um treino quando a integração estiver disponível.'}
          </EstadoDashboard>
        )}
      </section>

      <section className="secao-historico" aria-labelledby="titulo-historico">
        <div className="cabecalho-secao">
          <div>
            <span className="sobretitulo">ACOMPANHAMENTO</span>
            <h2 id="titulo-historico">Últimos treinos</h2>
          </div>
        </div>
        {status === 'carregando' && renderEstado('')}
        {status === 'indisponivel' && (
          <EstadoDashboard tipo="indisponivel" titulo="Histórico indisponível">
            Os registros serão exibidos aqui quando a API estiver conectada.
          </EstadoDashboard>
        )}
        {status === 'erro' && null}
        {status === 'pronto' && sessoes.length === 0 && (
          <EstadoDashboard tipo="vazio" titulo="Nenhum treino concluído ainda">
            Quando houver sessões registradas, elas aparecerão neste espaço.
          </EstadoDashboard>
        )}
        {status === 'pronto' && sessoes.length > 0 && (
          <ul className="lista-historico">
            {sessoes.map((sessao) => (
              <li className="cartao historico-item" key={sessao.id}>
                <div>
                  <strong>{sessao.workoutName}</strong>
                  <span>{formatarDataLonga(new Date(sessao.completedAt))}</span>
                </div>
                <span className="historico-duracao">{formatarDuracao(sessao.durationMinutes)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="rodape-pagina">
        MOVIMENTO COM INTENÇÃO
        <span>FORMA © 2025</span>
      </footer>
    </div>
  );
}

function converterNumeroDia(valor) {
  return String(Number(valor.slice(-2)));
}
