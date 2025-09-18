import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { LocalUser, Team } from '../@types';

const initialUserState: LocalUser = {
  displayName: '',
  email: '',
  photoURL: '',
  team: {},
  darkTheme: false,
  isLoading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    addUser: (_, action: PayloadAction<LocalUser>) => {
      return action.payload;
    },
    changeUserPicture: (state, action: PayloadAction<string>) => {
      state.photoURL = action.payload;
    },
    updateTeam: (state, action: PayloadAction<Team>) => {
      state.team = action.payload;
    },
    updateUser: (_, action: PayloadAction<LocalUser>) => {
      return action.payload;
    },
    updateTheme: (state, action: PayloadAction<boolean>) => {
      state.darkTheme = action.payload;
    },
    setIsUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: () => {
      return {
        displayName: '',
        email: '',
        photoURL: '',
        team: {},
        darkTheme: false,
        isLoading: false,
      };
    },
  },
});
//auth
export const selectIsUserExist = (state: RootState) => !!state.user.uid;
export const selectIsUserLoading = (state: RootState) => !!state.user.isLoading;
//
export const selectUser = (state: RootState) => state.user;
export const selectTeam = (state: RootState) => state.user.team;
export const selectUserId = (state: RootState) => state.user.uid;
export const selectIsDarkTheme = (state: RootState) => !!state.user.darkTheme;

export const userReducer = userSlice.reducer;
export const {
  logout,
  setIsUserLoading,
  addUser,
  changeUserPicture,
  updateTeam,
  updateUser,
  updateTheme,
} = userSlice.actions;
