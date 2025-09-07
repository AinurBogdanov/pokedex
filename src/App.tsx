import { Route, Routes } from 'react-router';
import { PokemonsPage } from './pages';
import { PokemonPage } from './pages/PokemonPage/PokemonPage';
// import styles from './App.module.scss';
import { Header } from './common/Header/Header';
import Auth from './pages/Auth/Auth';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PokemonsPage />} />
        <Route path="/pokemon/:name" element={<PokemonPage />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
