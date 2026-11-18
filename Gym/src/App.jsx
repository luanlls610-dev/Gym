import { useEffect, useState } from 'react';
import './App.css';
import { Navbar } from './componentes/Navbar';
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

export function App() {
  const [abaAtiva, setAbaAtiva] = useState('treinos');
  const [tema, setTema] = useState(lerTemaSalvo);

  // Mantém o tema escolhido entre visitas, sem impedir o uso em navegadores restritivos.
  useEffect(() => {
    document.documentElement.dataset.tema = tema;
    try {
      window.localStorage.setItem(CHAVE_TEMA, tema);
    } catch {
      // A preferência continua aplicada nesta sessão mesmo sem armazenamento local.
    }
  }, [tema]);

  const paginas = {
    treinos: <MeusTreinos />,
    biblioteca: <BibliotecaExercicios />,
    dicas: <DicasCalculadoras />,
    configuracoes: <Configuracoes tema={tema} onAlterarTema={setTema} />,
  };

  return (
    <div className="app-shell">
      <Navbar abaAtiva={abaAtiva} onSelecionarAba={setAbaAtiva} />
      <main className="conteudo-principal">{paginas[abaAtiva]}</main>
    </div>
  );
}

export default App;
