import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { generateComic } from 'utils/tests.utils';
import { ComicsListContextProvider, ComicsListContext } from './ComicsList.context';

describe('ComicsListContext context', () => {
  it('should start with a comic list empty by default', () => {
    render(
      <ComicsListContextProvider>
        <ComicsListContext.Consumer>
          {contextValue => (
            <span data-testid='amount'>amount of comics: {contextValue.comicsList.length}</span>
          )}
        </ComicsListContext.Consumer>
      </ComicsListContextProvider>
    );

    const amountOfComicsElement = screen.getByTestId('amount');
    expect(amountOfComicsElement).toHaveTextContent('amount of comics: 0');
  });

  it('should add a comic correctly', () => {
    const comicToBeAdded = generateComic({});

    render(
      <ComicsListContextProvider>
        <ComicsListContext.Consumer>
          {contextValue => (
            <>
              <button onClick={() => contextValue.addComic(comicToBeAdded)}>Adicionar comic</button>
              <span data-testid='amount'>amount of comics: {contextValue.comicsList.length}</span>
              <ul>
                {contextValue.comicsList.map(comic => (
                  <li key={comic.id}>{comic.id}</li>
                ))}
              </ul>
            </>
          )}
        </ComicsListContext.Consumer>
      </ComicsListContextProvider>
    );

    const getComicsListAmountElement = () => screen.getByTestId('amount');
    const getComicsListElement = () => screen.getByRole('list');

    expect(getComicsListAmountElement()).toHaveTextContent('amount of comics: 0');
    expect(getComicsListElement().children).toHaveLength(0);

    const addComicButton = screen.getByRole('button', { name: /adicionar comic/i });

    userEvent.click(addComicButton);

    expect(getComicsListAmountElement()).toHaveTextContent('amount of comics: 1');
    expect(getComicsListElement().children).toHaveLength(1);
  });

  it('should not add a comic if it is already in the list', () => {
    const comicToBeAdded = generateComic({});

    render(
      <ComicsListContextProvider>
        <ComicsListContext.Consumer>
          {contextValue => (
            <>
              <button onClick={() => contextValue.addComic(comicToBeAdded)}>Adicionar comic</button>
              <span data-testid='amount'>amount of comics: {contextValue.comicsList.length}</span>
              <ul>
                {contextValue.comicsList.map(comic => (
                  <li key={comic.id}>{comic.id}</li>
                ))}
              </ul>
            </>
          )}
        </ComicsListContext.Consumer>
      </ComicsListContextProvider>
    );

    const getComicsListAmountElement = () => screen.getByTestId('amount');
    const getComicsListElement = () => screen.getByRole('list');
    const addComicButton = screen.getByRole('button', { name: /adicionar comic/i });

    expect(getComicsListAmountElement()).toHaveTextContent('amount of comics: 0');
    expect(getComicsListElement().children).toHaveLength(0);

    userEvent.click(addComicButton); // adicionando o comic

    expect(getComicsListAmountElement()).toHaveTextContent('amount of comics: 1');
    expect(getComicsListElement().children).toHaveLength(1);

    userEvent.click(addComicButton); // adicionando o comic denovo, como é o mesmo comic, o tamanho ainda deve ser 1

    expect(getComicsListAmountElement()).toHaveTextContent('amount of comics: 1');
    expect(getComicsListElement().children).toHaveLength(1);
  });
});
