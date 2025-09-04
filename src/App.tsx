import { Route, Routes } from 'react-router';
import { PokemonsPage } from './pages';
import { PokemonPage } from './pages/PokemonPage/PokemonPage';

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<PokemonsPage />} />
        <Route path="/pokemon/:name" element={<PokemonPage />} />
      </Routes>
    </div>
  );
}

export default App;
