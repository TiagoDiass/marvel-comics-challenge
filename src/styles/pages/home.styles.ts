import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  min-height: 100vh;
  /* background-color: blue; */
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem 8rem;
`;

export const ComicsWrapper = styled.section`
  /* background-color: yellow; */

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2rem;
  row-gap: 1.2rem;
`;

export const ComicBlock = styled.article<{ thumbnail: string }>`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),
    url('${({ thumbnail }) => thumbnail}');
  background-repeat: no-repeat;
  background-size: cover;

  height: 450px;
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  row-gap: 1rem;

  color: ${({ theme }) => theme.colors.white};

  transition: all 0.2s ease;

  h4 {
    font-size: 1.6rem;
    align-self: center;
    text-align: center;
    cursor: default;
  }

  .links-wrapper {
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    padding-top: 1rem;
    display: flex;
    justify-content: space-between;

    a {
      text-transform: uppercase;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
