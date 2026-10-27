export type UserDto = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
};

export type EmotionRating = {
  name: string;
  intensity: number; // 1–10
};

export type CheckInDto = {
  id: string;
  date: string; // local YYYY-MM-DD
  createdAt: string; // ISO timestamp
  emotion: EmotionRating[];
  place: string; // "" when skipped
  people: string[];
  situation: string;
  autoThought: string;
  reactions: string[];
  behavior: string; // free-text part of the reaction step
  emotionAfter: EmotionRating[]; // re-rated at the end; [] when skipped
};
