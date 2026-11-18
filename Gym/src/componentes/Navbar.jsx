const itensNavegacao = [
  { id: 'treinos', rotulo: 'Meus treinos', icone: '▦' },
  { id: 'biblioteca', rotulo: 'Exercícios', icone: '◉' },
  { id: 'dicas', rotulo: 'Guias', icone: '◇' },
  { id: 'configuracoes', rotulo: 'Ajustes', icone: '⚙' },
];

export function Navbar({ abaAtiva, onSelecionarAba }) {
  return (
    <aside className="barra-lateral" aria-label="Navegação principal">
      <a className="marca" href="#inicio" onClick={() => onSelecionarAba('treinos')}>
        <span className="marca-icone">F</span>
        <span>FORMA<span className="marca-ponto">.</span><small>TRAINING CLUB</small></span>
      </a>
      <p className="rotulo-menu">MENU</p>
      <nav className="links-navegacao">
        {itensNavegacao.map((item) => (
          <button className={`link-navegacao ${abaAtiva === item.id ? 'ativo' : ''}`} key={item.id}
            onClick={() => onSelecionarAba(item.id)} aria-current={abaAtiva === item.id ? 'page' : undefined}>
            <span className="icone-nav" aria-hidden="true">{item.icone}</span>{item.rotulo}
          </button>
        ))}
      </nav>
      <div className="perfil-compacto"><div className="avatar">L</div><div><strong>Seu espaço</strong><span>Plano pessoal</span></div></div>
    </aside>
  );
}
