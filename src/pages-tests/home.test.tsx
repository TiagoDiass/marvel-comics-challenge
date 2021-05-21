import Home from 'pages';
import { screen, waitFor } from '@testing-library/react';
import { ComicsListContext, IComicsListContext } from 'contexts/ComicsList.context';
import {
  renderWithTheme,
  mockComicsListContextValue,
  mockApiComicsResponse,
} from 'utils/tests.utils';
import api from 'services/api';

jest.spyOn(api, 'get').mockResolvedValue(mockApiComicsResponse());

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
});
