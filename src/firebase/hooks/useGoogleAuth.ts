import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../api/auth';
import { addUser } from '../../redux/user/userSlice';

export function useGoogleAuth() {
  const dispatch = useDispatch();

  const handleAuth = async (method: 'SignIn' | 'SignUp') => {
    const result = await signInWithGoogle(method);
    const { displayName, email, phoneNumber, photoURL, uid } = result.user;

    dispatch(
      addUser({
        displayName,
        email,
        phoneNumber,
        photoURL,
        uid,
        isLoading: false,
      }),
    );
    return result;
  };

  return { signInWithGoogle: handleAuth };
}
