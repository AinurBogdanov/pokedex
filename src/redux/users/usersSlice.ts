import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LocalUser, UserId } from '../@types';
import type { RootState } from '../store';

type UsersState = {
  users: Record<string, LocalUser>;
  ids: UserId[];
};

const initialUserState: UsersState = {
  users: {},
  ids: [],
};

export const usersSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    addUser: (state, action: PayloadAction<LocalUser>) => {
      const id = action.payload.uid;
      const user = action.payload;
      if (id) {
        state.users[id] = user;
        state.ids.push(id);
      }
    },
    addUsers: (state, action: PayloadAction<Record<UserId, LocalUser>>) => {
      const users = action.payload;
      state.users = users;
      state.ids = Object.keys(users);
    },
  },
  selectors: {
    selectAllUsers: (state) => state.users,
    selectUsersIds: (state) => state.ids,
  },
});

// export const selectIsUserExist = (state: RootState) => !!state.user.user.uid;
// export const selectTeam = (state: RootState) => state.user.user.team;
// export const selectUserId = (state: RootState) => state.user.user.uid;

export const usersReducer = usersSlice.reducer;

export const { addUsers } = usersSlice.actions;

export const selectUser = (state: RootState, id: UserId) => state.users.users[id];
export const selectUsersIds = (state: RootState) => state.users.ids;
