import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserInfo } from 'firebase/auth';
import type { RootState } from '../store';

type UserState = {
  user: {
    city?: string;
  } & Partial<UserInfo>;
};

const initialUserState: UserState = {
  user: {
    displayName: '',
    email: '',
    photoURL: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    //fetch user from db and add to state
    addUser: (state, action: PayloadAction<UserState>) => {
      //get id from data and fetch user from db
      // and then save it all to state
      state.user = action.payload.user;
    },
    changeUserPicture: (state, action: PayloadAction<string>) => {
      state.user.photoURL = action.payload;
    },
  },
});

export const selectUser = (state: RootState) => state.user.user;
export const selectIsUserExist = (state: RootState) => !!state.user.user.uid;

export const userReducer = userSlice.reducer;
export const { addUser, changeUserPicture } = userSlice.actions;
