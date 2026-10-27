export type UserDto = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
};

export type CheckInDto = {
  id: string;
  date: string;
  createdAt: string;
  situation: string;
  emotion: {
    name: string;
    intensity: number;
  }[];
  autoThought: string;
  behavior: string;
};
