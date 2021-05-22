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
});
