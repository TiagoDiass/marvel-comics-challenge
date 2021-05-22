import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

/**
 * @component Document - Documento para tratar coisas que vão ficar em todas as páginas, como meta tags e afins
 */
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // configuração para utilizar styled-components no Next.js
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Lexend:wght@300;500;600&display=swap'
            rel='stylesheet'
          />

          <link rel='icon' href='/favicon2.png' type='image/png' />

          <meta
            name='description'
            content='ComicsExplorer | Os melhores quadrinhos da Marvel para você, sempre.'
          />

          <meta
            property='og:title'
            content='ComicsExplorer | Os melhores quadrinhos da Marvel para você'
          />

          <meta
            property='og:description'
            content='ComicsExplorer | Um website onde você pode procurar por quadrinhos da Marvel.'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
