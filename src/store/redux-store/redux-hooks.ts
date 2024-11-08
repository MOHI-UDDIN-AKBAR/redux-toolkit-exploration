import { RootState, AppDispatch } from './reduxStore';
import { useSelector, useDispatch } from 'react-redux';

const useAppSelector = useSelector.withTypes<RootState>();
const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export { useAppDispatch, useAppSelector };
