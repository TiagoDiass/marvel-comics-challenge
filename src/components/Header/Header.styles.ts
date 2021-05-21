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


