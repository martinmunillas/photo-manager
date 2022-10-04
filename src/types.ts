import { MyDate } from "main/date";

export interface Media {
  path: string;
  src: string;
  type: "image" | "video";
  name: string;
  description: string;
  date: MyDate;
  tags: string[];
  people: number[];
  favorite: boolean;
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
  gallery?: Media[];
}

export interface Query {
  albumId?: number;
  search?: string;
  startDate?: MyDate;
  endDate?: MyDate;
  exactDate?: MyDate;
  people?: number[];
  favorite?: boolean;
}
