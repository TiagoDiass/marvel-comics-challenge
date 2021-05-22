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

const mockAPIResponse = mockApiComicsResponse({});
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

    const searchBar = screen.getByTestId('search-bar');
    const searchBarInput = screen.getByRole('textbox');
    expect(searchBar).toHaveAttribute('data-is-loading', 'false');
    expect(searchBarInput).toHaveValue('');
  });

  it('should render comics correctly', async () => {
    await makeSut(mockComicsListContextValue());
    const mockAPIResults = mockAPIResponse.data.data.results;

    const comicsSection = screen.getByTestId('comics-wrapper');

    // verificando se a lista de comics tem a exata quantidade de filhos que o mock da api retorna
    expect(comicsSection.children).toHaveLength(mockAPIResults.length);

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

    userEvent.click(addToListButton);

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

    userEvent.click(removeFromListButton);

    // verificando se o removeComic() foi chamado com os params esperados
    expect(mockComicsContext.removeComic).toHaveBeenCalledWith(
      expect.objectContaining({ id: firstComicFromAPI.id })
    );

    // verificando se o Toast.fire() foi chamado com os params esperados
    expect(Toast.fire).toHaveBeenCalledWith({
      icon: 'success',
      title: 'Removido com sucesso',
    });
  });

  it('should load more comics correctly', async () => {
    // mockando api.get para retornar 12 resultados, e após isso retornar 0 na próxima request, o que fará que o botão de carregar mais será oculto após fazer a segunda request
    jest
      .spyOn(api, 'get')
      .mockResolvedValueOnce(
        mockApiComicsResponse({ currentOffset: 0, totalOffsets: 1, totalResults: 12 })
      )
      .mockResolvedValueOnce(
        mockApiComicsResponse({ currentOffset: 1, totalOffsets: 1, totalResults: 0 })
      );

    await makeSut(mockComicsListContextValue());

    const loadMoreButton = screen.getByText(/carregar mais/i);

    expect(loadMoreButton).toBeInTheDocument();

    userEvent.click(loadMoreButton);

    await waitFor(() => screen.getByRole('heading', { name: /quadrinhos/i }));

    expect(api.get).toHaveBeenCalledWith('/v1/public/comics', {
      params: {
        limit: 12,
        offset: 1,
      },
    });

    expect(loadMoreButton).not.toBeInTheDocument(); // o botão deve ter saído da DOM pois a segunda requisição não retornou nenhum quadrinho
  });

  it('should search for some comic correctly', async () => {
    await makeSut(mockComicsListContextValue());
    jest.spyOn(api, 'get').mockResolvedValueOnce(mockApiComicsResponse({ totalResults: 6 }));

    const searchBarInput = screen.getByRole('textbox');
    const searchBarButton = screen.getByRole('button', { name: /buscar/i });

    userEvent.type(searchBarInput, 'spiderman');
    userEvent.click(searchBarButton);

    await waitFor(() => screen.getByRole('heading', { name: /quadrinhos/i })); // esperando pelo heading pra RTL não dar warnings de problemas assíncronos

    // vendo se a api foi chamada com os params esperados
    expect(api.get).toHaveBeenCalledWith('/v1/public/comics', {
      params: {
        limit: 12,
        offset: 0,
        titleStartsWith: 'spiderman',
      },
    });

    const allComics = screen.getAllByRole('article');

    expect(allComics).toHaveLength(6);
  });

  it('should load more with a search query correctly', async () => {
    jest
      .spyOn(api, 'get')
      .mockResolvedValueOnce(mockApiComicsResponse({ totalResults: 6 })) // requisição inicial da página
      .mockResolvedValueOnce(
        // primeira requisição com a search query
        mockApiComicsResponse({ currentOffset: 0, totalOffsets: 2, totalResults: 4 })
      )
      .mockResolvedValueOnce(
        // requisição de load more com a search query
        mockApiComicsResponse({ currentOffset: 1, totalOffsets: 2, totalResults: 3 })
      )
      .mockResolvedValueOnce(
        // última requisição de load more com a search query, não vai retornar nenhum comic
        mockApiComicsResponse({ currentOffset: 2, totalOffsets: 2, totalResults: 0 })
      );

    await makeSut(mockComicsListContextValue());

    const getAllComicsElement = () => screen.getAllByRole('article');

    expect(getAllComicsElement()).toHaveLength(6);

    const searchBarInput = screen.getByRole('textbox');
    const searchBarButton = screen.getByRole('button', { name: /buscar/i });
    const loadMoreButton = screen.getByRole('button', { name: /carregar mais/i });

    userEvent.type(searchBarInput, 'spiderman');
    userEvent.click(searchBarButton);

    await waitFor(() => screen.getByRole('heading', { name: /quadrinhos/i })); // esperando pelo heading pra RTL não dar warnings de problemas assíncronos

    // primeira requisição de search
    expect(getAllComicsElement()).toHaveLength(4);

    // segunda requisição de search, deve somar os 4 que já tinha mais os novos 3
    expect(loadMoreButton).toBeInTheDocument();
    userEvent.click(loadMoreButton);

    await waitFor(() => screen.getByRole('heading', { name: /quadrinhos/i })); // esperando pelo heading pra RTL não dar warnings de problemas assíncronos

    expect(getAllComicsElement()).toHaveLength(7);
    expect(api.get).toHaveBeenLastCalledWith('/v1/public/comics', {
      params: {
        limit: 12,
        offset: 1,
        titleStartsWith: 'spiderman',
      },
    });

    // terceira e última requisição de search, após essa o botão de carregar mais deve sumir
    expect(loadMoreButton).toBeInTheDocument();
    userEvent.click(loadMoreButton);

    await waitFor(() => screen.getByRole('heading', { name: /quadrinhos/i })); // esperando pelo heading pra RTL não dar warnings de problemas assíncronos

    expect(loadMoreButton).not.toBeInTheDocument();
    expect(api.get).toHaveBeenLastCalledWith('/v1/public/comics', {
      params: {
        limit: 12,
        offset: 2,
        titleStartsWith: 'spiderman',
      },
    });
  });
});
