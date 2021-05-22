import { Comic } from '@types';
import { createContext, ReactNode, useContext, useState } from 'react';

export type IModalsContext = {
  currentComic: Comic;
  isComicDetailsModalOpen: boolean;
  openComicDetailsModal: (comic: Comic) => void;
  closeComicDetailsModal: () => void;
};

/**
 * @context Contexto de Modais
 */
export const ModalsContext = createContext({} as IModalsContext);

type ModalsContextProviderProps = {
  children: ReactNode;
};

/**
 * @contextProvider Provider do contexto de Modais
 */
export function ModalsContextProvider({ children }: ModalsContextProviderProps) {
  const [currentComic, setCurrentComic] = useState(null);
  const [isComicDetailsModalOpen, setIsComicDetailsModalOpen] = useState(false);

  const openComicDetailsModal = (comic: Comic) => {
    setCurrentComic(comic);
    setIsComicDetailsModalOpen(true);
  };

  const closeComicDetailsModal = () => {
    setIsComicDetailsModalOpen(false);
  };

  return (
    <ModalsContext.Provider
      value={{
        isComicDetailsModalOpen,
        currentComic,
        openComicDetailsModal,
        closeComicDetailsModal,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
}

/**
 * @contextHook Hook para utilizar o contexto de Modais
 */
export const useModalsContext = () => useContext(ModalsContext);
