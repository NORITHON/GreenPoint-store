import axios from 'axios';
import { IStore } from '../types';

export const getStore = async (id: string) => {
  const reponse = await axios
    .get(`${process.env.REACT_APP_SERVER_URL}/store/${id}`)
    .catch((error) => {
      return null;
    });

  return reponse?.data as IStore | null;
};
