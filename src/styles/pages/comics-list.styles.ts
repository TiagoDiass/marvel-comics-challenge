import styled from 'styled-components';
import { Animations } from 'styles';

export const ComicsListPageContainer = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  width: 70vw;
  margin: 0 auto;

  @media (max-width: 1260px) {
    width: 85vw;
  }

  @media (max-width: 960px) {
    width: 95vw;
  }
`;

export const ContentContainer = styled.div`
  padding: 2rem;
  border-radius: 0.4rem;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.15);
  background-color: ${({ theme }) => theme.colors.whiteDarker};

  animation: ${Animations.fadeFromLeft} 1s ease;
`;

export const ComicsTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    @media (max-width: 640px) {
      display: none;
    }
  }

  thead th {
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.secondaryDarker};

    padding: 12px;
    text-align: center;
  }

  tbody tr {
    border-bottom: 1px solid #eee;
    @media (max-width: 640px) {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }

  tbody td {
    padding: 12px;
    text-align: center;

    /* Primeira TD, que contém a CAPA */
    &:first-of-type {
      img {
        /* width: 100px; */
        height: 85px;
      }
    }

    /* botões que ficam na ultima TD */
    button {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 0.2rem;
      margin: 0 auto;
      padding: 0.4rem 1rem;

      & + button {
        margin-top: 0.5rem;
      }
    }
  }
`;

export const Footer = styled.footer`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  column-gap: 1rem;

  min-height: 2.25rem;
  /* background-color: red; */

  .input-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: 0.5rem;

    label {
      width: 20%;
      text-align: center;
      font-weight: 500;
    }

    input {
      height: 100%;
      outline: none;
      border: 1px solid #eee;
      padding: 0 6px;
      width: 80%;
      border-radius: 4px;

      &:focus {
        border: 1px solid ${({ theme }) => theme.colors.secondary};
      }
    }
  }

  button {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 0.5rem;
  }

  @media (max-width: 768px) {
    /* border: 1px solid red; */
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2.5rem 2.5rem;
    row-gap: 0.5rem;

    .input-wrapper,
    button {
      width: 100%;
    }
  }
`;
