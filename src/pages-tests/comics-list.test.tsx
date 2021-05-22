import ComicsListPage from 'pages/comics-list';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComicsListContext, IComicsListContext } from 'contexts/ComicsList.context';
import {
  generateComic,
  mockComicsListContextValue,
  mockModalsContextValue,
  renderWithTheme,
} from 'utils/tests.utils';
import { IModalsContext, ModalsContext } from 'contexts/Modals.context';
import { Toast } from 'plugins/sweetAlert';

jest.spyOn(Toast, 'fire');

/**
 * @factory fabrica o S.U.T (system under test), que neste caso, é o componente/página ComicsList
 */
const makeSut = async (
  comicsListContextValue: IComicsListContext,
  modalsContextValue: IModalsContext
) => {
  renderWithTheme(
    <ComicsListContext.Provider value={comicsListContextValue}>
      <ModalsContext.Provider value={modalsContextValue}>
        <ComicsListPage />
      </ModalsContext.Provider>
    </ComicsListContext.Provider>
  );

  // esperando até achar o heading pra poder fazer os asserts, padrão da RTL para aguardar ações assíncronas. Se não usar isso a RTL dá alguns warnings no terminal
  await waitFor(() => screen.getByRole('heading', { name: /sua lista de quadrinhos/i }));
};

describe('ComicsList page', () => {
  it('should render correctly with comics in the list', () => {
    const comicsList = [generateComic({}), generateComic({}), generateComic({})];
    const mockComicsContextValue: IComicsListContext = {
      ...mockComicsListContextValue(),
      comicsList,
    };

    makeSut(mockComicsContextValue, mockModalsContextValue());

    const comicsTable = screen.getByRole('table');
    const comicsTableBody = comicsTable.querySelector('tbody');

    expect(comicsTableBody.children).toHaveLength(3);

    const comicsTableItems = comicsTableBody.querySelectorAll('tr');

    // asserts em cada comic
    comicsTableItems.forEach((comic, index) => {
      const itemColumns = comic.querySelectorAll('td');

      // coluna da imagem
      expect(itemColumns[0].querySelector('img')).toBeInTheDocument();

      // coluna do título
      expect(itemColumns[1]).toHaveTextContent(comicsList[index].title);

      // coluna do ID
      expect(itemColumns[2]).toHaveTextContent(comicsList[index].id.toString());

      // coluna dos botões
      expect(itemColumns[3].querySelectorAll('button')).toHaveLength(2);
    });
  });

  it('should render correctly if there is no comics in the list', () => {
    const mockComicsContextValue: IComicsListContext = {
      ...mockComicsListContextValue(),
      comicsList: [],
    };

    makeSut(mockComicsContextValue, mockModalsContextValue());

    const noComicsInTheListHeading = screen.getByRole('heading', { name: /ops/i });

    expect(noComicsInTheListHeading).toHaveTextContent(
      'Ops... Parece que você ainda não adicionou nenhum quadrinho em sua lista'
    );
  });

  it('should call removeComic() from comic list context and toast.fire() when user clicks on remove button', async () => {
    const mockComicsContextValue: IComicsListContext = {
      ...mockComicsListContextValue(),
      comicsList: [generateComic({}), generateComic({}), generateComic({})],
    };

    await makeSut(mockComicsContextValue, mockModalsContextValue());

    // pegando o primeiro comic item na table
    const firstComicTableItem = screen.getByRole('table').querySelector('tbody tr');
    const removeComicButton = firstComicTableItem.querySelector('button');

    expect(removeComicButton).toHaveTextContent(/remover da lista/i);

    userEvent.click(removeComicButton);

    expect(mockComicsContextValue.removeComic).toHaveBeenCalledWith(
      mockComicsContextValue.comicsList[0]
    );

    expect(Toast.fire).toHaveBeenCalledWith({ icon: 'success', title: 'Removido com sucesso' });
  });

  it('should call openComicDetailsModal() from modal context when user clicks on details button', async () => {
    const mockComicsListContext = {
      ...mockComicsListContextValue(),
      comicsList: [generateComic({}), generateComic({}), generateComic({})],
    };
    const mockModalsContext: IModalsContext = mockModalsContextValue();

    await makeSut(mockComicsListContext, mockModalsContext);

    // pegando o primeiro comic item na table
    const firstComicTableItem = screen.getByRole('table').querySelector('tbody tr');
    const comicDetailsButton = firstComicTableItem.querySelectorAll('button')[1];

    expect(comicDetailsButton).toHaveTextContent(/detalhes/i);

    userEvent.click(comicDetailsButton);

    expect(mockModalsContext.openComicDetailsModal).toHaveBeenCalledWith(
      mockComicsListContext.comicsList[0]
    );
  });
});
