import Modal from 'react-modal';
import { useModalsContext } from 'contexts/Modals.context';
import * as S from './ComicDetailsModal.styles';

export default function ComicDetailsModal() {
  const {
    isComicDetailsModalOpen,
    closeComicDetailsModal,
    currentComic: comic,
  } = useModalsContext();

  return (
    <Modal
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
      isOpen={isComicDetailsModalOpen}
      onRequestClose={closeComicDetailsModal}
    >
      {comic && (
        <S.ModalContentContainer>
          <button type='button' onClick={closeComicDetailsModal} className='react-modal-close'>
            <img src='/images/close.svg' alt='Fechar modal de detalhes' />
          </button>

          <h1>Detalhes do quadrinho</h1>
          <h2>título: {comic.title}</h2>
        </S.ModalContentContainer>
      )}
    </Modal>
  );
}
