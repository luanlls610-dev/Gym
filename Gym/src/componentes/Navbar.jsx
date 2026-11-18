import { Button } from './ui/Button';
import { Icon } from './ui/Icon';

const itensNavegacao = [
  { id: 'treinos', rotulo: 'Meus treinos', icone: 'treinos' },
  { id: 'biblioteca', rotulo: 'Exercícios', icone: 'exercicios' },
  { id: 'dicas', rotulo: 'Guias e calculadoras', icone: 'guias' },
  { id: 'configuracoes', rotulo: 'Configurações', icone: 'configuracoes' },
];

/** Navegação principal, exibida como barra lateral ou barra inferior. */
export function Navbar({ abaAtiva, onSelecionarAba }) {
  return (
    <aside className="barra-lateral">
      <a
        className="marca"
        href="#main-content"
        onClick={() => onSelecionarAba('treinos')}
        aria-label="FORMA Training Club — início"
      >
        <span className="marca-icone" aria-hidden="true">F</span>
        <span className="marca-nome">FORMA<span className="marca-ponto">.</span><small>TRAINING CLUB</small></span>
      </a>

      <p className="rotulo-menu">MENU</p>
      <nav className="links-navegacao" aria-label="Navegação principal">
        {itensNavegacao.map((item) => (
          <Button
            key={item.id}
            className="link-navegacao"
            variant="navigation"
            onClick={() => onSelecionarAba(item.id)}
            aria-current={abaAtiva === item.id ? 'page' : undefined}
            aria-controls="main-content"
          >
            <Icon name={item.icone} className="icone-nav" />
            <span>{item.rotulo}</span>
          </Button>
        ))}
      </nav>

      <div className="perfil-compacto">
        <div className="avatar" aria-hidden="true">F</div>
        <div><strong>Seu espaço</strong><span>Plano pessoal</span></div>
      </div>
    </aside>
  );
}
