import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserInfo } from 'firebase/auth';

type UserState = {
  user: {
    firstName?: string;
    lastName?: string;
    city?: string;
  } & UserInfo;
};

const initialUserState: UserState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    displayName: '',
    phoneNumber: '',
    photoURL: '',
    providerId: '',
    uid: '',
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
      state = action.payload;
    },
  },
  selectors: {
    selectUser: (state) => {
      return state.user;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { addUser } = userSlice.actions;
export const { selectUser } = userSlice.selectors;
