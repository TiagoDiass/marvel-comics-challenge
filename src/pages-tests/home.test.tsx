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
const makeSut = async (comicsListContextValue: IComicsListContext) => {
  renderWithTheme(
    <ComicsListContext.Provider value={comicsListContextValue}>
      <Home />
    </ComicsListContext.Provider>
  );

  // esperando até achar o heading pra poder fazer os asserts, padrão da RTL para aguardar ações assíncronas. Se não usar isso a RTL dá alguns warnings no terminal
  await waitFor(() => screen.getByRole('heading', { name: /quadrinhos/i }));
};

describe('Home page', () => {
  it('should call api.get with the correct values when page renders', async () => {
    await makeSut(mockComicsListContextValue());

    expect(api.get).toHaveBeenCalledWith('/v1/public/comics', {
      params: {
        limit: 12,
      },
    });
  });

  it('should start with search bar empty and not loading', async () => {
    await makeSut(mockComicsListContextValue());

    const searchBar = screen.getByTestId('search-bar'); // obtendo o elemento da search bar inteira
    const searchBarInput = screen.getByRole('textbox'); // obtendo o input da search bar
    expect(searchBar).toHaveAttribute('data-loading', 'false');
    expect(searchBarInput).toHaveValue('');
  });

  it('should render comics correctly', async () => {
    await makeSut(mockComicsListContextValue());
    const mockAPIResults = mockAPIResponse.data.data.results;

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
