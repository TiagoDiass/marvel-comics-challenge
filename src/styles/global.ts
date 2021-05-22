import { createGlobalStyle } from 'styled-components';

/**
 * @styles Estilos globais que serão aplicados pelo styled-components
 */
const globalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%; // 15px
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%; // 14px
    }
  }

  body {
    font-family: ${({ theme }) => theme.fonts.default};
  }

  .react-modal-overlay {
    background-color: rgba(0, 0, 0, 0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-modal-content {
    width: 100%;
    max-width: 650px;
    max-height: 850px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 3rem;
    margin: 0.5rem;
    position: relative;
    border-radius: 0.5rem;

    overflow-y: scroll;

    /* Scroll */
    &::-webkit-scrollbar {
      
      width: 4px;
    }

    /* Scroll Handle */
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.primary};
    }
  }

  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;

    transition: all 0.2s ease;

    &:hover {
      cursor: pointer;
      filter: brightness(0.8);
    }
  }
`;

export default globalStyles;
