import { Navbar } from '../Navbar';

/** Estrutura comum que envolve navegação e conteúdo das páginas. */
export function AppShell({ abaAtiva, onSelecionarAba, children }) {
  return (
    <div className="app-shell">
      <Navbar abaAtiva={abaAtiva} onSelecionarAba={onSelecionarAba} />
      <main id="main-content" className="conteudo-principal" tabIndex="-1">
        {children}
      </main>
    </div>
  );
}
