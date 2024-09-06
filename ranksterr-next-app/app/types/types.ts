export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    points?: number;
  }
  
  export interface MovieCollection {
    id: number;
    name: string;
    parts: Movie[];
  }