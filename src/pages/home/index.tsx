"use client"

import HomePage from './ui/HomePage';
import store from '@/store';
import { Provider } from 'react-redux';

export const Home = () => {
  return (
    <Provider store={store}> <HomePage /></Provider>
  )
}
