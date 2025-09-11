import { Route, Routes } from 'react-router';
import { PokemonsPage } from './pages';
import { PokemonPage } from './pages/PokemonPage/PokemonPage';
import Auth from './pages/Auth/Auth';
import { Layout } from './layout/layout';
import PrivateRoutes from './guard/PrivateRoutes';
import Account from './pages/AccountPage/AccountPage';
import { useAuthUser } from './firebase/hooks/useAuthUser';

function App() {
  const userLoading = useAuthUser();

  if (userLoading) return <>Loading...</>;

  return (
    <>
      <Routes>
        <Route path={'/auth'} element={<Auth />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<PokemonsPage />} />
            <Route path="/pokemon/:name" element={<PokemonPage />} />
            <Route path="/account/*" element={<Account />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
