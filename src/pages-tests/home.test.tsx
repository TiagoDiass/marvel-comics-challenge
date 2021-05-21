import Home from 'pages';
import { screen, waitFor } from '@testing-library/react';
import { ComicsListContext, IComicsListContext } from 'contexts/ComicsList.context';
import {
  renderWithTheme,
  mockComicsListContextValue,
  mockApiComicsResponse,
} from 'utils/tests.utils';
import api from 'services/api';

const mockAPIResponse = mockApiComicsResponse();
jest.spyOn(api, 'get').mockResolvedValue(mockAPIResponse);

/**
 * @factory fabrica o S.U.T (system under test), que neste caso, é o componente/página Home
 */
const makeSut = (comicsListContextValue: IComicsListContext) => {
  renderWithTheme(
    <ComicsListContext.Provider value={comicsListContextValue}>
      <Home />
    </ComicsListContext.Provider>
  );
};

describe('Home page', () => {
  it('should call api.get with the correct values when page renders', async () => {
    makeSut(mockComicsListContextValue());

    await waitFor(() => screen.getByRole('heading', { name: /quadrinhos/i })); // esperando até achar o heading pra poder fazer os asserts, padrão da RTL

    expect(api.get).toHaveBeenCalledWith('/v1/public/comics', {
      params: {
        limit: 12,
      },
    });
  });

  it('should start with search bar empty and not loading', async () => {
    makeSut(mockComicsListContextValue());

    await waitFor(() => screen.getByRole('heading'));

    const searchBar = screen.getByTestId('search-bar'); // obtendo o elemento da search bar inteira
    const searchBarInput = screen.getByRole('textbox'); // obtendo o input da search bar
    expect(searchBar).toHaveAttribute('data-loading', 'false');
    expect(searchBarInput).toHaveValue('');
  });

  it('should render comics correctly', async () => {
    makeSut(mockComicsListContextValue());
    const mockAPIResults = mockAPIResponse.data.data.results;

    await waitFor(() => screen.getByRole('heading'));

    const comicsSection = screen.getByTestId('comics-wrapper');
    expect(comicsSection.children).toHaveLength(mockAPIResults.length);

    const comics = screen.getAllByRole('article');

    comics.forEach((comic, index) => {
      expect(comic.querySelector('h4')).toBeInTheDocument();
      expect(comic.querySelector('h4')).toHaveTextContent(mockAPIResults[index].title);
      expect(comic.querySelector('a.add-or-remove-to-list')).toHaveTextContent(
        /adicionar à lista/i
      );
      expect(comic.querySelector('a.details')).toHaveTextContent(/detalhes/i);
    });
  });
});
