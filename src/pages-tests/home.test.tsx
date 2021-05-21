import Home from 'pages';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComicsListContext, IComicsListContext } from 'contexts/ComicsList.context';
import {
  renderWithTheme,
  mockComicsListContextValue,
  mockApiComicsResponse,
} from 'utils/tests.utils';
import api from 'services/api';
import { Toast } from 'plugins/sweetAlert';

const mockAPIResponse = mockApiComicsResponse();
jest.spyOn(api, 'get').mockResolvedValue(mockAPIResponse);
jest.spyOn(Toast, 'fire');

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
  it('should call api.get() with the correct values when page renders', async () => {
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
    expect(searchBar).toHaveAttribute('data-is-loading', 'false');
    expect(searchBarInput).toHaveValue('');
  });

  it('should render comics correctly', async () => {
    await makeSut(mockComicsListContextValue());
    const mockAPIResults = mockAPIResponse.data.data.results;

    const comicsSection = screen.getByTestId('comics-wrapper');
    expect(comicsSection.children).toHaveLength(mockAPIResults.length); // verificando se a lista de comics tem a exata quantidade de filhos que o mock da api retorna

    const comics = screen.getAllByRole('article');

    // percorrendo os comics para verificar seus elementos internos
    comics.forEach((comic, index) => {
      expect(comic.querySelector('h4')).toBeInTheDocument();
      expect(comic.querySelector('h4')).toHaveTextContent(mockAPIResults[index].title);
      expect(comic.querySelector('a.remove-or-add-to-list')).toHaveTextContent(
        /adicionar à lista/i
      );
      expect(comic.querySelector('a.details')).toHaveTextContent(/detalhes/i);
    });
  });

  it('should call addComic() from context and toast.fire() when user clicks on "add to list"', async () => {
    const mockComicsContext = mockComicsListContextValue();
    await makeSut(mockComicsContext);
    const firstComicFromAPI = mockAPIResponse.data.data.results[0];

    const comic = screen.getByRole('heading', { name: firstComicFromAPI.title }).parentElement; // obtendo o elemento do primeiro comic para fazer os asserts
    const addToListButton = comic.querySelector('a.remove-or-add-to-list');

    userEvent.click(addToListButton); // clicando no botão de adicionar à lista

    // verificando se o addComic() foi chamado com os params esperados
    expect(mockComicsContext.addComic).toHaveBeenCalledWith(
      expect.objectContaining({ id: firstComicFromAPI.id })
    );

    // verificando se o Toast.fire() foi chamado com os params esperados
    expect(Toast.fire).toHaveBeenCalledWith({
      icon: 'success',
      title: 'Adicionado com sucesso',
    });
  });

  it('should call removeComic() from context and toast.fire() when user clicks on "remove from list"', async () => {
    const mockComicsContext: IComicsListContext = {
      ...mockComicsListContextValue(),
      isComicAlreadyInList: () => true, // mockando contexto para retornar que o comic já está na lista, assim o componente chamará o removeComic()
    };
    await makeSut(mockComicsContext);
    const firstComicFromAPI = mockAPIResponse.data.data.results[0];

    const comic = screen.getByRole('heading', { name: firstComicFromAPI.title }).parentElement; // obtendo o elemento do primeiro comic para fazer os asserts
    const removeFromListButton = comic.querySelector('a.remove-or-add-to-list');

    userEvent.click(removeFromListButton); // clicando no botão de adicionar à lista

    // verificando se o addComic() foi chamado com os params esperados
    expect(mockComicsContext.removeComic).toHaveBeenCalledWith(
      expect.objectContaining({ id: firstComicFromAPI.id })
    );

    // verificando se o Toast.fire() foi chamado com os params esperados
    expect(Toast.fire).toHaveBeenCalledWith({
      icon: 'success',
      title: 'Removido com sucesso',
    });
  });
});
