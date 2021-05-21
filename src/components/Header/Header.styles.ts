import styled, { css } from 'styled-components';

export const HeaderContainer = styled.header`
  min-height: 6.5rem;
  background-color: ${({ theme }) => theme.colors.primaryDarker};

  display: flex;
  align-items: center;
  padding: 2rem 8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};

  @media (max-width: 960px) {
    padding: 2rem 4rem;
  }

  @media (max-width: 768px) {
    padding: 2rem;
    flex-direction: column;
  }
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

    @media (max-width: 768px) {
      margin: 0;
      padding: 0;
      margin-top: 0.6rem;
      padding-top: 0.5rem;
      border-left: none;
      border-top: 1px solid ${theme.colors.whiteDarker};

      text-align: center;
    }
  `};
`;

export const ComicsAmount = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  transition: opacity 0.15s ease-in-out;

  &:hover {
    cursor: pointer;
    opacity: 0.85;
  }

  & div {
    text-align: right;
    margin-right: 10px;

    @media (max-width: 430px) {
      display: none;
    }

    & strong {
      display: block;
      color: ${({ theme }) => theme.colors.white};
    }

    & span {
      font-size: 12px;
      color: ${({ theme }) => theme.colors.whiteDarker};
    }
  }
`;
