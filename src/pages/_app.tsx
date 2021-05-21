import { ComicsListContextProvider } from 'contexts/ComicsList.context';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from 'styles';

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Configuração padrão do Styled Components para utilizar com Next.js */}
      <ThemeProvider theme={theme}>
        <GlobalStyles />

        <ComicsListContextProvider>
          <Component {...pageProps} />
        </ComicsListContextProvider>
      </ThemeProvider>
    </>
  );
}
