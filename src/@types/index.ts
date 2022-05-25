export type APIComic = {
  id: number;
  title: string;
  description?: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  pageCount: number;
  creators: {
    items: Array<{ name: string; role: string }>;
  };
};

export type Comic = {
  id: number;
  title: string;
  description: string; // optional in APIComic but required here because converter adds a default description
  thumbnailUrl: string;
  totalPageCount: number;
  creators: string[];
};
