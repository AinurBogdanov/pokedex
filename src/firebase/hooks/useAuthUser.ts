import { onAuthStateChanged, getAuth } from 'firebase/auth';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import React from 'react';
import { getAndSaveUser } from '../api/db';
import { logout, setIsUserLoading } from '../../redux/user/userSlice';

export function useAuthUser() {
  const [userLoading, setUserLoading] = React.useState<boolean>(false);

  const auth = getAuth();
  const dispatch = useDispatch<AppDispatch>();
  // нужна для диспатча юзера при перезагрузке

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserLoading(true);

      if (currentUser) {
        console.log('useAuthUser:  user does exists');
        const { uid } = currentUser;

        getAndSaveUser(uid, dispatch).then(() => {
          dispatch(setIsUserLoading(false));
          setUserLoading(false);
        });
      } else {
        console.log('useAuthUser:  user does`t exists');
        dispatch(logout());
        dispatch(setIsUserLoading(false));
        setUserLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  return userLoading;
}
