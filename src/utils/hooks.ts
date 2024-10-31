import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getLocalStorageOrDefault } from './data-parser';



export const useStateWithLocalStorage = <T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(getLocalStorageOrDefault<T>(key, defaultValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};