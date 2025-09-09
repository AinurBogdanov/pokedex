import { onAuthStateChanged, getAuth } from 'firebase/auth';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/user/userSlice';
import React from 'react';

export function useAuthUser() {
  const [userLoading, setUserLoading] = React.useState<boolean>(true);
  const auth = getAuth();

  const dispatch = useDispatch<AppDispatch>();
  // нужна для диспатча юзера при первом перезагрузке

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { email, displayName, phoneNumber, photoURL, providerId, uid } = currentUser;

        dispatch(addUser({ user: { email, displayName, phoneNumber, photoURL, providerId, uid } }));
      }
      if (!currentUser) console.log('current user нема');

      setUserLoading(false);
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  return userLoading;
}
