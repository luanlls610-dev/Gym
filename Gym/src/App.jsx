import { useState } from 'react';
import { Navbar } from './componentes/Navbar';
import { MeusTreinos } from './pages/meus_treinos';
import { AdministrarTreinos } from './pages/administrar_treinos';
import { BibliotecaExercicios } from './pages/biblioteca_exercicios';
import { DicasCalculadoras } from './pages/dicas_calculadoras';

export function App() {
  const [abaAtiva, setAbaAtiva] = useState('treinos');

  return (
    <div className="app-container">
      <Navbar abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />

      <main className="conteudo-principal">
        {abaAtiva === 'treinos' && <MeusTreinos />}
        {abaAtiva === 'admin' && <AdministrarTreinos />}
        {abaAtiva === 'biblioteca' && <BibliotecaExercicios />}
        {abaAtiva === 'dicas' && <DicasCalculadoras />}
      </main>
    </div>
  );
}

export default App;