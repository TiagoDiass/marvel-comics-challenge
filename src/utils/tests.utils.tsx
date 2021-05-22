import faker from 'faker';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import { render, RenderResult } from '@testing-library/react';
import { IComicsListContext } from 'contexts/ComicsList.context';
import { APIComic } from '@types';

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

/**
 * @helper factory que retorna um mock de um comic da API
 */
export const mockApiComic = (): APIComic => ({
  id: faker.datatype.number(8500),
  title: faker.random.words(5),
  description: faker.random.words(35),
  creators: {
    items: [
      {
        name: faker.name.findName(),
        role: faker.random.words(2),
      },
    ],
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
      results: new Array(totalResults).fill(undefined).map(() => mockApiComic()), // criando um array do tamanho pedido
    },
  },
});
