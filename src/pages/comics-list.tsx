import Head from 'next/head';
import { BiMailSend } from 'react-icons/bi';
import * as S from 'styles/pages/comics-list.styles';

export default function ComicsList() {
  return (
    <>
      <Head>
        <title>ComicsExplorer | Lista de Quadrinhos</title>
      </Head>

      <S.ComicsListPageContainer>
        <h1>Sua lista de quadrinhos</h1>

        <S.ContentContainer>
          <h2>kkkk</h2>
          <h2>kkkk</h2>
          <h2>kkkk</h2>

          <S.Footer>
            <div className='input-wrapper'>
              <label htmlFor='email'>E-mail</label>
              <input
                id='email'
                type='text'
                placeholder='Digite um e-mail para enviar a lista de quadrinhos...'
              />
            </div>

            <button>
              Enviar <BiMailSend size={20} />
            </button>
          </S.Footer>
        </S.ContentContainer>
      </S.ComicsListPageContainer>
    </>
  );
}
