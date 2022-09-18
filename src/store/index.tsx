import { createStore } from 'redux'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'

import { todoReducer } from './reducers/todoReducer';

export const store = createStore(todoReducer);

type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => any = useDispatch;

