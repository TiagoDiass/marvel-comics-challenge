import { Comic } from '@types';
import { createContext, ReactNode, useContext, useState } from 'react';

export type IComicsListContext = {
  comicsList: Comic[];
  addComic: (comic: Comic) => void;
  removeComic: (comic: Comic) => void;
  isComicAlreadyInList: (comic: Comic) => boolean;
  getTotalComics: () => number;
};

export const ComicsListContext = createContext({} as IComicsListContext);

type ComicsListContextProviderProps = {
  children: ReactNode;
};

export function ComicsListContextProvider({ children }: ComicsListContextProviderProps) {
  const [comicsList, setComicsList] = useState<Comic[]>([]);

  const addComic = (newComic: Comic) => {
    const comicExists = isComicAlreadyInList(newComic);

    if (!comicExists) {
      setComicsList([...comicsList, newComic]);
    }
  };

  const removeComic = (comicToBeRemoved: Comic) => {
    // filtrando a nova lista, removendo o comic que o usuário escolheu remover
    const newComicsList = comicsList.filter(comic => comic.id !== comicToBeRemoved.id);

    setComicsList(newComicsList);
  };

  const isComicAlreadyInList = (comicToBeSearched: Comic): boolean => {
    const comicExists = comicsList.find(comic => comic.id === comicToBeSearched.id);

    return !!comicExists;
  };

  const getTotalComics = () => comicsList.length;

  return (
    <ComicsListContext.Provider
      value={{ comicsList, addComic, removeComic, isComicAlreadyInList, getTotalComics }}
    >
      {children}
    </ComicsListContext.Provider>
  );
}

export const useComicsListContext = () => useContext(ComicsListContext);
