import Link from 'next/link';
import * as S from './Header.styles';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { useComicsListContext } from 'contexts/ComicsList.context';

/**
 * @component Header / Cabeçalho
 */
export default function Header() {
  const { getTotalComics } = useComicsListContext();
  const totalComics = getTotalComics();

  return (
    <S.HeaderContainer>
      <Link href='/'>
        <S.Logo>
          <span>Comics</span>Explorer
        </S.Logo>
      </Link>

      <S.Slogan>Os melhores quadrinhos para você, sempre.</S.Slogan>

      <Link href='/comics-list'>
        <S.ComicsAmount title='Clique aqui para ver a sua lista de quadrinhos'>
          <div>
            <strong>Meus quadrinhos</strong>

            {totalComics ? (
              <span data-testid='amount-label'>
                {totalComics === 1 ? `1 quadrinho` : `${totalComics} quadrinhos`}
              </span>
            ) : (
              <span data-testid='amount-label'>Nenhum quadrinho adicionado</span>
            )}
          </div>
          <AiOutlineUnorderedList size={32} color='#fff' />

          <span>{totalComics}</span>
        </S.ComicsAmount>
      </Link>
    </S.HeaderContainer>
  );
}
