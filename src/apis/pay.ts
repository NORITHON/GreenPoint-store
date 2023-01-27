import axios from 'axios';
import { IUser } from '../types';

export const getUserByContact = async (contact: string) => {
  const reponse = await axios
    .get(`${process.env.REACT_APP_SERVER_URL}/readCustomerByNum?contact=${contact}`)
    .catch((error) => {
      return null;
    });

  return reponse?.data as IUser | null;
};

export const payment = async ({
  customerId,
  storeId,
  cost,
  savedPoint,
  usedPoint,
}: {
  customerId: number;
  storeId: number;
  cost: number;
  savedPoint: number;
  usedPoint: number;
}) => {
  const reponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/history`, {
    customerId,
    storeId,
    cost,
    savedPoint,
    usedPoint,
  });

  return reponse;
};
