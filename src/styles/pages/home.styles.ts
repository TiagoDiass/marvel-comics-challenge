import styled, { css } from 'styled-components';
import { Animations } from 'styles';

export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem 8rem;

  @media (max-width: 960px) {
    padding: 1rem 4rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
  }
`;

export const HomeHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;

  @media (max-width: 960px) {
    flex-direction: column;
    height: 80px;
    row-gap: 0.5rem;
  }
`;

export const SearchBar = styled.form<{ isLoading: boolean }>`
  ${({ theme, isLoading }) => css`
    width: min(500px, 100%);
    height: 100%;
    display: flex;
    align-items: center;

    input {
      border: none;
      outline: none;
      height: 100%;
      font-size: 0.9rem;
      width: 85%;
      padding: 0 0.5rem;
      border-radius: 0.3rem 0 0 0.3rem;
      border: 1px solid ${theme.colors.secondary};
      border-right: 0;

      transition: all 0.15s ease;

      &:focus {
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
      }
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

      &:disabled {
        opacity: 0.7;
      }

      svg {
        color: ${theme.colors.white};
        transition: all 0.2s ease;
        animation: ${isLoading
          ? css`
              ${Animations.rotate} 1.3s linear infinite
            `
          : 'none'};
      }

      &:hover:not(:disabled) {
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

export const ComicsWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2rem;
  row-gap: 1.2rem;

  @media (max-width: 1640px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ComicBlock = styled.article<{ thumbnail?: string }>`
  animation: ${Animations.fadeFromLeft} 0.5s ease;
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

  /* estiliando o comic block vazio para fazer o shimmer effect */
  &:empty {
    overflow: hidden;
    position: relative;

    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)),
      url('${({ thumbnail }) => thumbnail}');
  }

  &:empty::after {
    animation: ${Animations.shimmer} 1.2s infinite ease;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
  }

  @media (max-width: 1280px) {
    h4 {
      font-size: 1.3rem;
    }
  }
`;

export const LoadMoreButton = styled.button<{ isLoadingMore: boolean }>`
  ${({ theme, isLoadingMore }) => css`
    margin: 1rem 0;
    align-self: center;
    width: min(20rem, 100%);
    padding: 0.6rem 1rem;

    background-color: ${isLoadingMore ? theme.colors.primary : 'transparent'};
    color: ${isLoadingMore ? theme.colors.white : theme.colors.primary};
    border: 1px solid ${theme.colors.primary};
    border-radius: 0.5rem;
    text-transform: uppercase;
    font-family: ${theme.fonts.default};
    font-weight: 500;

    transition: all 0.2s ease;

    &:hover {
      cursor: ${isLoadingMore ? 'wait' : 'pointer'};
      color: ${theme.colors.white};
      background-color: ${theme.colors.primary};
    }
  `}
`;
