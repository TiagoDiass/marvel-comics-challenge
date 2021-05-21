import * as S from './Header.styles';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';
import { useState } from 'react';

export default function Header() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <S.HeaderContainer>
      <S.Logo>
        <span>Comics</span>Explorer
      </S.Logo>

      <S.Slogan>Os melhores quadrinhos para você, sempre.</S.Slogan>

      <S.SearchBar isLoading={isLoading}>
        <input
          type='text'
          aria-details='Barra de busca'
          placeholder='Digite um quadrinho para buscar...'
        />
        <button>{isLoading ? <FaSpinner /> : <AiOutlineSearch />}</button>
      </S.SearchBar>
    </S.HeaderContainer>
  );
}
