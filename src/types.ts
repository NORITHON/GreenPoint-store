export interface IMenu {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface ILevel {
  id: number;
  name: string;
  img: string;
}

export interface IUser {
  id: number;
  kakaoId: number;
  level: ILevel;
  contact: string;
  image: string;
  nickname: string;
  latitude: number;
  longitude: number;
  point: number;
  totalPoint: number;
}
