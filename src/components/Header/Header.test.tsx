import Header from './Header';
import { screen } from '@testing-library/react';
import { ComicsListContext, IComicsListContext } from 'contexts/ComicsList.context';
import { renderWithTheme, mockComicsListContextValue } from 'utils/tests.utils';

/**
 * @factory fabrica o S.U.T (System under test), que neste caso, é o componente Header
 */
const makeSut = (comicsListContextValue: IComicsListContext) => {
  renderWithTheme(
    <ComicsListContext.Provider value={comicsListContextValue}>
      <Header />
    </ComicsListContext.Provider>
  );
};

describe('Header component', () => {
  it('should show that there are no comics in the list if total comics amount is 0', () => {
    makeSut({
      ...mockComicsListContextValue(),
      getTotalComics: () => 0, // mockando o getTotalComics para retornar 0, e assim o componente renderizar a label esperada
    });

    const totalComics = screen.getByTitle(/sua lista de quadrinhos/i);
    const amountLabel = screen.getByTestId('amount-label');

    expect(totalComics).toBeInTheDocument();
    expect(amountLabel).toHaveTextContent('Nenhum quadrinho adicionado');
  });

  it('should show that there are only one comic in the list if total comics amount is 1', () => {
    makeSut({
      ...mockComicsListContextValue(),
      getTotalComics: () => 1, // mockando o getTotalComics para retornar 0, e assim o componente renderizar a label esperada
    });

    const amountLabel = screen.getByTestId('amount-label');
    expect(amountLabel).toHaveTextContent('1 quadrinho');
  });
});
