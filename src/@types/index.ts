export type APIComic = {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

export type Comic = {
  id: number;
  title: string;
  thumbnailUrl: string;
};
