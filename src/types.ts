export interface Photo {
  path: string;
  data?: string;
  name: string;
  description: string;
  date: string;
  tags: string[];
  people: People[];
}

export interface People {
  name: string;
  tags: string[];
}
