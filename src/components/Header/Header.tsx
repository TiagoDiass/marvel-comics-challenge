import * as S from './Header.styles';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { useComicsListContext } from 'contexts/ComicsList.context';

export default function Header() {
  const { getTotalComics } = useComicsListContext();
  const total = getTotalComics();

  return (
    <S.HeaderContainer>
      <S.Logo>
        <span>Comics</span>Explorer
      </S.Logo>

      <S.Slogan>Os melhores quadrinhos para você, sempre.</S.Slogan>

      <S.ComicsAmount title='Clique aqui para ver a sua lista de quadrinhos'>
        <div>
          <strong>Meus quadrinhos</strong>
          {total ? (
            <span>{total === 1 ? `1 quadrinho` : `${total} quadrinhos`}</span>
          ) : (
            <span>Nenhum quadrinho adicionado</span>
          )}
        </div>
        <AiOutlineUnorderedList size={32} color='#fff' />
      </S.ComicsAmount>
    </S.HeaderContainer>
  );
}
