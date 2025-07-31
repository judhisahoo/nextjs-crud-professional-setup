import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { login } from '@/redux/slices/userSlice';

export default function useUserInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('global user checking with useUserIntilizer');
    const userData = localStorage.getItem('user');
    console.log(
      'global user checking with with useUserIntilizer by userData Var from localstorage',
      userData,
    );
    if (userData) {
      console.log(
        'global user checking with with useUserIntilizer by userData Var adn calling dispatch(login())',
      );
      dispatch(login(JSON.parse(userData)));
    }
  }, [dispatch]);
}
