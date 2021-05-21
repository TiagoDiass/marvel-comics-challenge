import { ThemeProvider } from 'styled-components';
import { render, RenderResult } from '@testing-library/react';
import { IComicsListContext } from 'contexts/ComicsList.context';
import theme from 'styles/theme';

/**
 * @helper renderiza o componente com o tema utilizado pelo ThemeProvider do styled-components
 */
export const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);

/**
 * @helper factory que retorna um mock do valor do contexto de ComicsListContext
 */
export const mockComicsListContextValue = (): IComicsListContext => ({
  addComic: jest.fn(),
  removeComic: jest.fn(),
  getTotalComics: jest.fn(),
  isComicAlreadyInList: jest.fn(),
  comicsList: [],
});
