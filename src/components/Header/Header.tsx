import * as S from './Header.styles';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { useComicsListContext } from 'contexts/ComicsList.context';

export default function Header() {
  const { getTotalComics } = useComicsListContext();
  const totalComics = getTotalComics();

  return (
    <S.HeaderContainer>
      <S.Logo>
        <span>Comics</span>Explorer
      </S.Logo>

      <S.Slogan>Os melhores quadrinhos para você, sempre.</S.Slogan>

      <S.ComicsAmount title='Clique aqui para ver a sua lista de quadrinhos'>
        <div>
          <strong>Meus quadrinhos</strong>
          {totalComics ? (
            <span>{totalComics === 1 ? `1 quadrinho` : `${totalComics} quadrinhos`}</span>
          ) : (
            <span>Nenhum quadrinho adicionado</span>
          )}
        </div>
        <AiOutlineUnorderedList size={32} color='#fff' />

        <span>{totalComics}</span>
      </S.ComicsAmount>
    </S.HeaderContainer>
  );
}
