import styled from 'styled-components';

export const ComicsListPageContainer = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem 8rem;
  width: 70vw;
  margin: 0 auto;

  @media (max-width: 960px) {
    padding: 1rem 4rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
  }
`;

export const ContentContainer = styled.div`
  padding: 2rem;
  border-radius: 0.4rem;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.15);
  background-color: ${({ theme }) => theme.colors.whiteDarker};
`;

export const Footer = styled.footer`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 2.25rem;
  /* background-color: red; */

  .input-wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    width: 50%;

    label {
      width: 10%;
      text-align: center;
      font-weight: 500;
    }

    input {
      height: 100%;
      outline: none;
      border: 1px solid ${({ theme }) => theme.colors.secondary};
      padding: 0 6px;
      width: 90%;
      border-radius: 4px;
    }
  }

  button {
    height: 100%;
    width: 48%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 0.5rem;

    font-family: ${({ theme }) => theme.fonts.default};
    text-transform: uppercase;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};

    border: none;
    outline: none;
    border-radius: 4px;

    cursor: pointer;

    transition: all 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDarker};
    }
  }
`;
