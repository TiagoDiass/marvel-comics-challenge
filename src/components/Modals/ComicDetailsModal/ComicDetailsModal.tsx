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

          <div className='details'>
            <h2>Detalhes do Quadrinho</h2>
            <img src={comic.thumbnailUrl} alt={comic.title} />
            <h3>Título: {comic.title}</h3>
            <h3>Descrição: {comic.description}</h3>
            <h3>
              {comic.creators.length === 1 ? 'Criador' : 'Criadores'}: {comic.creators.join(', ')}
            </h3>
            <h3>Total de páginas: {comic.totalPageCount}</h3>
          </div>
        </S.ModalContentContainer>
      )}
    </Modal>
  );
}
