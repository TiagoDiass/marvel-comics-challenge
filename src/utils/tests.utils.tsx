import faker from 'faker';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import { render, RenderResult } from '@testing-library/react';
import { IComicsListContext } from 'contexts/ComicsList.context';
import { APIComic, Comic } from '@types';
import convertAPIComicToComic from './convertAPIComicToComic';
import { IModalsContext } from 'contexts/Modals.context';

/**
 * @helper renderiza o componente com o tema utilizado pelo ThemeProvider do styled-components
 */
export const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);

/**
 * @helper factory que retorna um mock do valor do contexto de ComicsListContext
 */
export const mockComicsListContextValue = (): IComicsListContext => ({
  addComic: jest.fn(),
  removeComic: jest.fn(),
  getTotalComics: jest.fn(),
  isComicAlreadyInList: jest.fn(),
  comicsList: [],
});

type MockApiComicsParams = {
  totalCreators?: number;
};

/**
 * @helper factory que retorna um mock de um comic da API
 */
export const mockApiComic = ({ totalCreators = 1 }: MockApiComicsParams): APIComic => ({
  id: faker.datatype.number(8500),
  title: faker.random.words(5),
  description: faker.random.words(35),
  creators: {
    items: new Array(totalCreators)
      .fill(null)
      .map(() => ({ name: faker.name.findName(), role: faker.random.words(2) })),
  },
  pageCount: faker.datatype.number(),
  thumbnail: {
    path: faker.image.imageUrl(),
    extension: 'jpg',
  },
});

type MockApiComicsResponseParams = {
  currentOffset?: number;
  totalCount?: number;
  totalResults?: number;
};

/**
 * @helper factory que retorna um mock de uma resposta da API com os comics
 */
export const mockApiComicsResponse = ({
  currentOffset = 0,
  totalCount = 10,
  totalResults = 3,
}: MockApiComicsResponseParams) => ({
  status: 200,
  data: {
    data: {
      offset: currentOffset,
      total: totalCount,
      results: new Array(totalResults).fill(null).map(() => mockApiComic({})), // criando um array do tamanho pedido
    },
  },
});

type GenerateComicParams = {
  totalCreators?: number;
};

/**
 * @helper factory que retorna um mock do tipo Comic
 */
export const generateComic = (params: GenerateComicParams): Comic =>
  convertAPIComicToComic(mockApiComic({ totalCreators: params.totalCreators }));

/**
 * @helper factory que retorna um mock do valor do contexto de Modal
 */
export const mockModalsContextValue = (): IModalsContext => ({
  openComicDetailsModal: jest.fn(),
  closeComicDetailsModal: jest.fn(),
  currentComic: null,
  isComicDetailsModalOpen: false,
});
