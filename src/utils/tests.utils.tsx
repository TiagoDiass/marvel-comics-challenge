import { ThemeProvider } from 'styled-components';
import { render, RenderResult } from '@testing-library/react';
import { IComicsListContext } from 'contexts/ComicsList.context';
import theme from 'styles/theme';

export const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);

export const mockComicsListContextValue = (): IComicsListContext => ({
  addComic: jest.fn(),
  removeComic: jest.fn(),
  getTotalComics: jest.fn(),
  isComicAlreadyInList: jest.fn(),
  comicsList: [],
});
