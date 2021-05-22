import Header from 'components/Header/Header';
import { ComicsListContextProvider } from 'contexts/ComicsList.context';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from 'styles';
import Modal from 'react-modal';
import { ComicDetailsModal } from 'components/Modals';
import { ModalsContextProvider } from 'contexts/Modals.context';

// configurando o root element para o react-modal
Modal.setAppElement('#__next');

/**
 * @component App - componente raiz do Next.js
 */
export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Configuração padrão do Styled Components para utilizar com Next.js */}
      <ThemeProvider theme={theme}>
        <GlobalStyles />

        <ComicsListContextProvider>
          <ModalsContextProvider>
            <Header />
            <Component {...pageProps} />

            <ComicDetailsModal />
          </ModalsContextProvider>
        </ComicsListContextProvider>
      </ThemeProvider>
    </>
  );
}
