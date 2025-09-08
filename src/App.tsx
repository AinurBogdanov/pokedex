import { Route, Routes } from 'react-router';
import { PokemonsPage } from './pages';
import { PokemonPage } from './pages/PokemonPage/PokemonPage';
import Auth from './pages/Auth/Auth';
import { Layout } from './layout/layout';
import React from 'react';
import { onAuthStateChanged, getAuth, type User } from 'firebase/auth';
import PrivateRoutes from './guard/PrivateRoutes';
import Account from './pages/Account/Account';

function App() {
  const auth = getAuth();
  const [user, setUser] = React.useState<User | undefined>();
  const [userLoading, setUserLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setUserLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser as User);
      setUserLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  if (userLoading) return <>Loading...</>;

  return (
    <>
      <Routes>
        <Route path={'/auth'} element={<Auth />} />

        <Route element={<PrivateRoutes user={user} />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<PokemonsPage />} />
            <Route path="/pokemon/:name" element={<PokemonPage />} />
            <Route path="/account" element={<Account />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
