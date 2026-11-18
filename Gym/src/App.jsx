import { useEffect, useState } from 'react';
import { AppShell } from './componentes/layout/AppShell';
import './App.css';
import './estilos/layout.css';
import { MeusTreinos } from './pages/meus_treinos';
import { BibliotecaExercicios } from './pages/biblioteca_exercicios';
import { DicasCalculadoras } from './pages/dicas_calculadoras';
import { Configuracoes } from './pages/configuracoes';

const CHAVE_TEMA = 'gym-tema';

function lerTemaSalvo() {
  try {
    return window.localStorage.getItem(CHAVE_TEMA) === 'claro' ? 'claro' : 'escuro';
  } catch {
    return 'escuro';
  }
}

/** Mantém a preferência de tema e compõe as áreas principais da aplicação. */
export function App() {
  const [abaAtiva, setAbaAtiva] = useState('treinos');
  const [tema, setTema] = useState(lerTemaSalvo);

  useEffect(() => {
    document.documentElement.dataset.tema = tema;
    try {
      window.localStorage.setItem(CHAVE_TEMA, tema);
    } catch {
      // O tema permanece ativo durante esta sessão mesmo sem armazenamento local.
    }
  }, [tema]);

  const paginas = {
    treinos: <MeusTreinos />,
    biblioteca: <BibliotecaExercicios />,
    dicas: <DicasCalculadoras />,
    configuracoes: <Configuracoes tema={tema} onAlterarTema={setTema} />,
  };

  return (
    <AppShell abaAtiva={abaAtiva} onSelecionarAba={setAbaAtiva}>
      {paginas[abaAtiva]}
    </AppShell>
  );
}

export default App;
