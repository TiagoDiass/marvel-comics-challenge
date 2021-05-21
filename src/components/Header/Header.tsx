import * as S from './Header.styles';
import { useState } from 'react';

export default function Header() {
  return (
    <S.HeaderContainer>
      <S.Logo>
        <span>Comics</span>Explorer
      </S.Logo>

      <S.Slogan>Os melhores quadrinhos para você, sempre.</S.Slogan>
    </S.HeaderContainer>
  );
}
