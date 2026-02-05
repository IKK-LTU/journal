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
  autoThoughts: string[];
  behavior: string;
};
