import { Route, Routes } from 'react-router';
import { PokemonsPage } from './pages';
import { PokemonPage } from './pages/PokemonPage/PokemonPage';
// import styles from './App.module.scss';
import { Header } from './common/Header/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PokemonsPage />} />
        <Route path="/pokemon/:name" element={<PokemonPage />} />
      </Routes>
    </>
  );
}

export default App;
