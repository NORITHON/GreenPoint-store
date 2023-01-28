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

export const getMenus = async (id: number) => {
  const reponse = await axios
    .get(`${process.env.REACT_APP_SERVER_URL}/menu/${id}`)
    .catch((error) => {
      return null;
    });

  return reponse?.data ?? [];
};

export const getPointList = async (id: number) => {
  const reponse = await axios
    .get(`${process.env.REACT_APP_SERVER_URL}/point/${id}`)
    .catch((error) => {
      return null;
    });

  return reponse?.data ?? [];
};
