import { getDatabase, ref, get, update } from 'firebase/database';
import type { AppDispatch } from '../../redux/store';
import { addUser, changeUserPicture, updateTeam } from '../../redux/user/userSlice';
import { app } from '../firebase';

const db = getDatabase(app);

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

export function updatePhotoUrl(userId: string, newPhotoUrl: string, dispatch: AppDispatch) {
  const userRef = ref(db, 'users/' + userId);
  update(userRef, {
    photoURL: newPhotoUrl,
  })
    .then(() => {
      dispatch(changeUserPicture(newPhotoUrl));
    })
    .catch((error) => {
      console.error('Update failed:', error);
    });
}

export const addToTeam = async (userId: string, newPokemonId: number, dispatch: AppDispatch) => {
  try {
    const userRef = ref(db, 'users/' + userId);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      const currentTeam = userData.team || {};

      const previousTeamLength = Number(Object.keys(currentTeam).length);

      const isTeamHasThisPok = Object.values(currentTeam).some(
        (slot: any) => slot.pokemonId === newPokemonId,
      );
      if (isTeamHasThisPok)
        return {
          success: false,
          message: `Этот покемон уже есть в вашей команде!`,
          error: 'POKEMON_ALREADY_IN_TEAM',
        };

      const updatedTeam = {
        ...currentTeam,
        ['pokemon' + (previousTeamLength + 1)]: { pokemonId: newPokemonId, level: 0 },
      };

      //add to redux storage
      await update(userRef, { team: updatedTeam });

      dispatch(updateTeam(updatedTeam));

      return {
        success: true,
        message: 'Покемон успешно добавлен в команду!',
        team: updatedTeam,
      };
    } else {
      return {
        success: false,
        message: `Пользователь не найден`,
        error: 'User_Not_Found',
      };
    }
  } catch (error) {
    console.error('Ошибка:', error);
    return {
      success: false,
      message: 'Произошла ошибка при добавлении покемона',
      error: 'SERVER_ERROR',
    };
  }
};
