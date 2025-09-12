import { onAuthStateChanged, getAuth } from 'firebase/auth';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import React from 'react';
import { getAndSaveUser } from '../api/db';
import { useNavigate } from 'react-router';

export function useAuthUser() {
  const [userLoading, setUserLoading] = React.useState<boolean>(false);

  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // нужна для диспатча юзера при перезагрузке

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserLoading(true);
      if (currentUser) {
        const { uid } = currentUser;
        getAndSaveUser(uid, dispatch).then(() => {
          navigate('/');
        });
      }
      if (!currentUser) {
        console.log('current user нема');
      }
      setUserLoading(false);
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  return userLoading;
}
