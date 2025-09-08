import { Route, Routes } from 'react-router';
import { PokemonsPage } from './pages';
import { PokemonPage } from './pages/PokemonPage/PokemonPage';
import Auth from './pages/Auth/Auth';
import { Layout } from './layout/layout';
import React from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import PrivateRoutes from './guard/PrivateRoutes';
import Account from './pages/Account/Account';
import type { AppDispatch } from './redux/store';
import { useDispatch } from 'react-redux';
import { addUser } from './redux/user/userSlice';

function App() {
  const auth = getAuth();
  // const [user, setUser] = React.useState<User | undefined | null>();
  const [userLoading, setUserLoading] = React.useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { email, displayName, phoneNumber, photoURL, providerId, uid } = currentUser;

        dispatch(addUser({ user: { email, displayName, phoneNumber, photoURL, providerId, uid } }));
        console.log('user dispatched');
        // console.log(currentUser);
      }
      if (!currentUser) console.log('current user нема');
      setUserLoading(false);
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  if (userLoading) return <>Loading...</>;

  return (
    <>
      <Routes>
        <Route path={'/auth'} element={<Auth />} />

        <Route element={<PrivateRoutes />}>
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
