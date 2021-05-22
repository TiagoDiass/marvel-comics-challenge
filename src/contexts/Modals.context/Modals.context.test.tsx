import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { generateComic } from 'utils/tests.utils';
import { ModalsContextProvider, ModalsContext } from './Modals.context';

describe('ModalsContext context', () => {
  it('should start with modal closed and currentComic null', () => {
    render(
      <ModalsContextProvider>
        <ModalsContext.Consumer>
          {contextValue => (
            <>
              <span data-testid='details-modal-status'>
                Modal de detalhes: {contextValue.isComicDetailsModalOpen ? 'aberto' : 'fechado'}
              </span>
              <span data-testid='current-comic'>
                Comic está null: {contextValue.currentComic ? 'não' : 'sim'}
              </span>
            </>
          )}
        </ModalsContext.Consumer>
      </ModalsContextProvider>
    );

    const getDetailsModalStatus = () => screen.getByTestId('details-modal-status');
    const getCurrentComicStatus = () => screen.getByTestId('current-comic');

    expect(getDetailsModalStatus()).toHaveTextContent('Modal de detalhes: fechado');
    expect(getCurrentComicStatus()).toHaveTextContent('Comic está null: sim');
  });

  it('should open the comic details modal correctly', () => {
    const comicToBeOpenedOnTheModal = generateComic({});

    render(
      <ModalsContextProvider>
        <ModalsContext.Consumer>
          {contextValue => (
            <>
              <span data-testid='details-modal-status'>
                Modal de detalhes: {contextValue.isComicDetailsModalOpen ? 'aberto' : 'fechado'}
              </span>
              <span data-testid='current-comic'>
                Comic está null: {contextValue.currentComic ? 'não' : 'sim'}
              </span>
              <button onClick={() => contextValue.openComicDetailsModal(comicToBeOpenedOnTheModal)}>
                Abrir modal
              </button>
            </>
          )}
        </ModalsContext.Consumer>
      </ModalsContextProvider>
    );

    const getDetailsModalStatus = () => screen.getByTestId('details-modal-status');
    const getCurrentComicStatus = () => screen.getByTestId('current-comic');
    const openModalButton = screen.getByRole('button', { name: /abrir modal/i });

    expect(getDetailsModalStatus()).toHaveTextContent('Modal de detalhes: fechado');
    expect(getCurrentComicStatus()).toHaveTextContent('Comic está null: sim');

    userEvent.click(openModalButton);

    expect(getDetailsModalStatus()).toHaveTextContent('Modal de detalhes: aberto');
    expect(getCurrentComicStatus()).toHaveTextContent('Comic está null: não');
  });
});
