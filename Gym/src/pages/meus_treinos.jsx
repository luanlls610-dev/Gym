const programacaoSemanal = [
  ['Peito e tríceps', '6 exercícios', 'feito'],
  ['Costas e bíceps', '5 exercícios', 'hoje'],
  ['Recuperação', 'Dia de descanso', 'descanso'],
  ['Pernas', '7 exercícios', 'futuro'],
  ['Ombros e core', '5 exercícios', 'futuro'],
  ['Cardio leve', '1 exercício', 'futuro'],
  ['Descanso', 'Recuperação', 'descanso'],
];

function obterSemanaAtual() {
  const hoje = new Date();
  const inicioSemana = new Date(hoje);
  const deslocamento = (hoje.getDay() + 6) % 7;
  inicioSemana.setDate(hoje.getDate() - deslocamento);

  return programacaoSemanal.map(([nome, detalhe, estado], indice) => {
    const data = new Date(inicioSemana);
    data.setDate(inicioSemana.getDate() + indice);
    const eHoje = data.toDateString() === hoje.toDateString();
    const rotuloDia = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' })
      .format(data).replace('.', '').toUpperCase();

    return {
      dia: rotuloDia,
      numero: data.getDate(),
      nome,
      detalhe,
      estado: eHoje ? 'hoje' : estado,
    };
  });
}

export function MeusTreinos() {
  const diasSemana = obterSemanaAtual();
  const dataAtual = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long',
  }).format(new Date()).toUpperCase();

  return (
    <div className="pagina pagina-treinos">
      <header className="topo-pagina"><div><span className="sobretitulo">{dataAtual}</span><h1>Seu treino, no seu ritmo.</h1><p>Consistência é o que transforma esforço em resultado.</p></div><button className="botao botao-secundario" type="button" aria-label="Notificações">♧</button></header>
      <section className="resumo-grid" aria-label="Resumo da semana">
        <article className="cartao resumo-cartao"><span className="resumo-icone vermelho">↗</span><strong className="numero-resumo">04<span>/05</span></strong><span className="rotulo-resumo">treinos concluídos</span><div className="barra-progresso"><span /></div></article>
        <article className="cartao resumo-cartao"><span className="resumo-icone laranja">◷</span><strong className="numero-resumo">3<span>h 25</span></strong><span className="rotulo-resumo">tempo em movimento</span><div className="mini-barras"><i /><i /><i /><i /><i /><i /><i /></div></article>
        <article className="cartao frase-cartao"><span className="aspas">“</span><p>O corpo alcança aquilo em que a mente acredita.</p><span className="texto-suave">UM DIA DE CADA VEZ</span></article>
      </section>
      <section className="secao-agenda"><div className="cabecalho-secao"><div><span className="sobretitulo">PLANEJAMENTO</span><h2>Sua semana</h2></div><button className="botao botao-texto" type="button">Ver histórico ↗</button></div>
        <div className="agenda-semanal">{diasSemana.map(({ dia, numero, nome, detalhe, estado }) => <article key={dia} className={`dia-card ${estado === 'hoje' ? 'dia-hoje' : ''}`}><span className="dia-label">{dia}</span><strong className="dia-numero">{numero}</strong><span className={`dia-marcador ${estado}`} /><div className="dia-detalhe"><strong>{nome}</strong><span>{detalhe}</span></div></article>)}</div>
      </section>
      <section className="secao-treino-hoje"><div className="cabecalho-secao"><div><span className="sobretitulo">SEU PRÓXIMO PASSO</span><h2>Treino de hoje</h2></div><button className="botao botao-texto" type="button">Editar treino ↗</button></div>
        <article className="cartao treino-destaque"><div className="treino-ilustracao" aria-hidden="true"><span>02</span><div className="orb orb-um" /><div className="orb orb-dois" /><div className="linha-grafica" /></div><div className="treino-info"><span className="tag tag-vermelha">TREINO B</span><h3>Costas e bíceps</h3><p>Foco em força e controle. Respeite seu ritmo entre as séries.</p><div className="treino-metadados"><span>◉ 5 exercícios</span><span>◷ ~50 min</span></div></div><button className="botao botao-primario" type="button">Começar treino →</button></article>
      </section>
      <footer className="rodape-pagina">MOVIMENTO COM INTENÇÃO<span>FORMA © 2025</span></footer>
    </div>
  );
}
