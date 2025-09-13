import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { LocalUser, Team } from '../@types';

const initialUserState: LocalUser = {
  user: {
    displayName: '',
    email: '',
    photoURL: '',
    team: {},
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    addUser: (state, action: PayloadAction<LocalUser>) => {
      state.user = action.payload.user;
    },
    changeUserPicture: (state, action: PayloadAction<string>) => {
      state.user.photoURL = action.payload;
    },
    updateTeam: (state, action: PayloadAction<Team>) => {
      state.user.team = action.payload;
    },
  },
});

export const selectUser = (state: RootState) => state.user.user;
export const selectIsUserExist = (state: RootState) => !!state.user.user.uid;
export const selectTeam = (state: RootState) => state.user.user.team;
export const selectUserId = (state: RootState) => state.user.user.uid;

export const userReducer = userSlice.reducer;
export const { addUser, changeUserPicture, updateTeam } = userSlice.actions;
