import { getDatabase, ref, get, update } from 'firebase/database';
import type { AppDispatch } from '../../redux/store';
import { addUser, changeUserPicture, updateTeam } from '../../redux/user/userSlice';
import { app } from '../firebase';
import { addUsers } from '../../redux/users/usersSlice';
import type { PokemonId, Team, UserId } from '../../redux/@types';

const db = getDatabase(app);

export async function getAndSaveUser(uid: string, dispatch: AppDispatch) {
  const userRef = ref(db, 'users/' + uid);

  const snapshot = await get(userRef);

  try {
    if (snapshot.exists()) {
      const user = snapshot.val();
      user.uid = uid;
      console.log(user);
      await dispatch(addUser(user));
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

export const addToTeam = async (userId: UserId, newPokemonId: PokemonId, dispatch: AppDispatch) => {
  try {
    const userRef = ref(db, 'users/' + userId);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      const currentTeam = userData.team || {};

      const currentLength = Number(Object.keys(currentTeam).length);

      if (currentLength >= 6) {
        return {
          success: false,
          message: `Нельзя добавлять больше покемонов`,
          error: 'Adding new Pokemons is not allowed',
        };
      }
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
        ['pokemon' + newPokemonId]: { pokemonId: newPokemonId, level: 0 },
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
export const deleteFromTeam = async (userId: UserId, pokId: PokemonId, dispatch: AppDispatch) => {
  const userRef = ref(db, 'users/' + userId);
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    const userData = snapshot.val();
    const currentTeam = (userData.team as Team) || {};
    delete currentTeam[`pokemon${pokId}`];
    const updatedTeam = currentTeam;

    await update(userRef, { team: updatedTeam });
    dispatch(updateTeam(updatedTeam));
  }
};

export async function getAllUsers(dispatch: AppDispatch) {
  const usersRef = ref(db, 'users/');
  const snapshot = await get(usersRef);

  try {
    if (snapshot.exists()) {
      const users = snapshot.val();
      dispatch(addUsers(users));
    } else {
      console.log('No data available');
    }
  } catch (error) {
    console.error(error, 'som went wrong');
  }
}
