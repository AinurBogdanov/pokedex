import { ref, set } from 'firebase/database';
import type { AppDispatch } from '../../redux/store';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { addUser } from '../../redux/user/userSlice';
import {} from 'firebase/auth';
import type { SignInParams } from '../../pages/Auth/formsTypes';
import { auth, db } from '../firebase';

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
