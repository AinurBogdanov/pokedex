import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user/userSlice';
import { usersReducer } from './users/usersSlice';
import { useSelector } from 'react-redux';

export const store = configureStore({
  reducer: { user: userReducer, users: usersReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
