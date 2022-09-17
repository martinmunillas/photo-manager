import { MyDate } from "main/date";

export interface Photo {
  path: string;
  data?: string;
  name: string;
  description: string;
  date: MyDate;
  tags: string[];
  people: number[];
}

export interface Person {
  id: number;
  name: string;
  nickname: string;
  tags: string[];
}

export interface Album {
  id: number;
  name: string;
  description: string;
  photos: string[];
}
