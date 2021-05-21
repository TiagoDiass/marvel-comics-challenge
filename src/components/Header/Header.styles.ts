import styled, { css, keyframes } from 'styled-components';

export const HeaderContainer = styled.header`
  height: 6.5rem;
  background-color: ${({ theme }) => theme.colors.primaryDarker};

  display: flex;
  align-items: center;
  padding: 2rem 8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
`;

export const Logo = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.whiteDarker};
    font-family: ${theme.fonts.heading};
    font-weight: 300;

    span {
      color: ${theme.colors.white};
      font-weight: 600;
    }
  `};
`;

export const Slogan = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    margin-left: 2rem;
    padding: 0.25rem 0px 0.25rem 2rem;
    border-left: 1px solid ${theme.colors.whiteDarker};
  `};
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SearchBar = styled.div<{ isLoading: boolean }>`
  ${({ theme, isLoading }) => css`
    margin-left: auto;
    width: 500px;
    height: 100%;
    display: flex;
    align-items: center;
    /* border: 1px solid white; */

    input {
      border: none;
      outline: none;
      height: 100%;
      font-size: 0.9rem;
      width: 85%;
      padding: 0 0.5rem;
      border-radius: 0.3rem 0 0 0.3rem;
    }

    button {
      background-color: ${theme.colors.secondary};
      border: none;
      outline: none;
      height: 100%;
      width: 15%;
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0 0.3rem 0.3rem 0;

      svg {
        color: ${theme.colors.white};
        transition: all 0.2s ease;
        animation: ${isLoading
          ? css`
              ${rotate} 1.3s linear infinite
            `
          : 'none'};
      }

      &:hover {
        filter: brightness(0.95);
        cursor: ${isLoading ? 'initial' : 'pointer'};

        ${!isLoading &&
        css`
          svg {
            transform: scaleX(-1);
          }
        `}
      }
    }
  `}
`;
