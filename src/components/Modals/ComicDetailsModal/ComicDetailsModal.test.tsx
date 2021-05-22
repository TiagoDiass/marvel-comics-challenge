import { screen } from '@testing-library/react';
import { IModalsContext, ModalsContext } from 'contexts/Modals.context';
import { generateComic, mockModalsContextValue, renderWithTheme } from 'utils/tests.utils';
import ComicDetailsModal from './ComicDetailsModal';
import userEvent from '@testing-library/user-event';

/**
 * @factory fabrica o S.U.T (system under test), que neste caso é o modal de detalhes de um quadrinho
 */
const makeSut = (mockModalsContextValue: IModalsContext) => {
  renderWithTheme(
    <ModalsContext.Provider value={mockModalsContextValue}>
      <ComicDetailsModal />
    </ModalsContext.Provider>
  );
};

describe('ComicDetailsModal modal', () => {
  it('should render correctly with only one creator', () => {
    const comicMock = generateComic({});
    const mockContextValue: IModalsContext = {
      ...mockModalsContextValue(),
      currentComic: comicMock,
      isComicDetailsModalOpen: true,
    };

    makeSut(mockContextValue);

    const modalContent = screen.getByRole('dialog');
    const comicImage = screen.getByRole('img', { name: comicMock.title });
    const comicTitle = screen.getByRole('heading', { name: /título/i });
    const comicDescription = screen.getByRole('heading', { name: /descrição/i });
    const comicCreator = screen.getByRole('heading', { name: /criador/i });
    const comicTotalPages = screen.getByRole('heading', { name: /total de páginas/i });

    // asserts do modal
    expect(modalContent).toBeInTheDocument();
    expect(comicImage).toBeInTheDocument();
    expect(comicImage).toHaveAttribute('alt', comicMock.title);
    expect(comicTitle).toHaveTextContent(comicMock.title);
    expect(comicDescription).toHaveTextContent(comicMock.description);
    expect(comicCreator).toHaveTextContent(comicMock.creators[0]);
    expect(comicTotalPages).toHaveTextContent(comicMock.totalPageCount.toString());
  });

  it('should render correctly with more than one creator', () => {
    const comicMock = generateComic({ totalCreators: 3 });
    const mockContextValue: IModalsContext = {
      ...mockModalsContextValue(),
      currentComic: comicMock,
      isComicDetailsModalOpen: true,
    };

    makeSut(mockContextValue);

    const comicCreators = screen.getByRole('heading', { name: /criadores/i });

    expect(comicCreators).toHaveTextContent(`Criadores: ${comicMock.creators.join(', ')}`);
  });

  it('should call closeComicDetailsModal() from context when user clicks on the close button', () => {
    const mockContextValue = {
      ...mockModalsContextValue(),
      isComicDetailsModalOpen: true,
      currentComic: generateComic({}),
    };

    makeSut(mockContextValue);

    const closeButton = screen.getByRole('button', { name: /fechar modal de detalhes/i });

    userEvent.click(closeButton);

    expect(mockContextValue.closeComicDetailsModal).toHaveBeenCalled();
  });

  it('should render nothing if currentComic from context is null', () => {
    const mockContextValue: IModalsContext = {
      ...mockModalsContextValue(),
      currentComic: null,
      isComicDetailsModalOpen: true,
    };

    makeSut(mockContextValue);

    const modalContent = screen.getByTestId('comic-details-modal');

    expect(modalContent).toBeEmptyDOMElement();
  });
});
