import { createGlobalStyle } from 'styled-components';

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
`;

export default globalStyles;
