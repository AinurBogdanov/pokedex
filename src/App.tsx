import { Route, Routes } from 'react-router';
import { PokemonsPage } from './pages';
import { PokemonPage } from './pages/PokemonPage/PokemonPage';
import Auth from './pages/Auth/Auth';
import { Layout } from './layout/layout';
import PrivateRoutes from './guard/PrivateRoutes';
import Account from './pages/AccountPage/AccountPage';
import { useAuthUser } from './firebase/hooks/useAuthUser';
import { Users } from './pages/UsersPage/UsersPage';
import { SettingsProvider } from './Context/SettingsContext';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsDarkTheme } from './redux/user/userSlice';

function App() {
  const userLoading = useAuthUser();
  const darkTheme = useSelector(selectIsDarkTheme);

  React.useEffect(() => {
    document.body.classList.toggle('dark', darkTheme);
  }, [darkTheme, userLoading]);

  if (userLoading) return <>Loading...</>;

  return (
    <>
      <SettingsProvider>
        <Routes>
          <Route path={'/auth'} element={<Auth />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<PokemonsPage />} />
              <Route path="/pokemon/:name" element={<PokemonPage />} />
              <Route path="/users" element={<Users />} />
              <Route path="/account/*" element={<Account />} />
            </Route>
          </Route>
        </Routes>
      </SettingsProvider>
    </>
  );
}

export default App;
