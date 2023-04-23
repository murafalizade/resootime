import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import commentSlice from './commonSlice';

const store = configureStore({
    reducer: commentSlice.reducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export default store;
