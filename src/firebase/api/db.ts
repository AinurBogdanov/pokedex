import { getDatabase, ref, get } from 'firebase/database';
import type { AppDispatch } from '../../redux/store';
import { addUser } from '../../redux/user/userSlice';

const db = getDatabase();

export async function getAndSaveUser(uid: string, dispatch: AppDispatch) {
  const userRef = ref(db, 'users/' + uid);

  const snapshot = await get(userRef);

  try {
    if (snapshot.exists()) {
      const user = snapshot.val();
      user.uid = uid;
      await dispatch(addUser({ user }));
    } else {
      console.log('No data available');
    }
  } catch (error) {
    console.error(error);
  }
}
// onValue(userRef, (snapShot) => {
//   const user = snapShot.val();
//   console.log(user);
//   dispatch(addUser({ user }));
// });
