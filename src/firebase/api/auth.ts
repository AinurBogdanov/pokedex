import { ref, set } from 'firebase/database';
import type { AppDispatch } from '../../redux/store';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { addUser } from '../../redux/user/userSlice';
import {} from 'firebase/auth';
import type { SignInParams } from '../../pages/Auth/formsTypes';
import { auth, db, googleAuthProvider } from '../firebase';

export async function registerUser({
  name,
  lastName,
  email,
  password,
  dispatch,
}: {
  name: string;
  lastName: string;
  email: string;
  password: string;
  dispatch: AppDispatch;
}) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  await set(ref(db, 'users/' + userCredential.user.uid), {
    name,
    lastName,
    email,
    profile_picture: null,
  });

  await updateProfile(userCredential.user, {
    displayName: name + ' ' + lastName,
  });
  const updatedUser = auth.currentUser;
  if (updatedUser) {
    const { email, displayName, phoneNumber, photoURL, providerId, uid } = updatedUser;

    // const { email, displayName, phoneNumber, photoURL, providerId, } = updatedUser;
    // нужно фетчить юзера из БДы

    // нужно совать в редакс юзера из дб
    dispatch(addUser({ user: { email, displayName, phoneNumber, photoURL, providerId, uid } }));
    return updatedUser;
  }

  throw new Error('auth error');
}

export async function signInUser({ email, password }: SignInParams) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    // "INVALID_LOGIN_CREDENTIALS"
    alert(error);
  }
}
export function signInWithGoogle(method: 'SignIn' | 'SignUp') {
  return signInWithPopup(auth, googleAuthProvider)
    .then((userCredential) => {
      const { displayName, email, photoURL } = userCredential.user;
      //проблема в том что тут необходимо по сути добавлять юзера в БД но проблема в том что если юзер уже зареган то не не надо его по нововой сетить в БД  нужно просто акксес дать
      if (method === 'SignUp') {
        set(ref(db, 'users/' + userCredential.user.uid), {
          displayName,
          email,
          photoURL: photoURL,
        });
      }
      alert(`${method}`);
    })
    .catch((error) => console.log(error));
}
export function signOutUser() {
  signOut(auth);
}
