import Head from 'next/head';
import { BiMailSend } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import * as S from 'styles/pages/comics-list.styles';
import convertAPIComicToComic from 'utils/convertAPIComicToComic';
import mock from '../../mock.json';

export default function ComicsList() {
  const comicsList = [
    convertAPIComicToComic(mock.results[0]),
    convertAPIComicToComic(mock.results[1]),
    convertAPIComicToComic(mock.results[2]),
    convertAPIComicToComic(mock.results[3]),
  ];

  return (
    <>
      <Head>
        <title>ComicsExplorer | Lista de Quadrinhos</title>
      </Head>

      <S.ComicsListPageContainer>
        <h1>Sua lista de quadrinhos</h1>

        <S.ContentContainer>
          <S.ComicsTable>
            <thead>
              <tr>
                <th>Capa</th>
                <th>Título</th>
                <th>ID</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {comicsList.map(comic => (
                <tr key={comic.id}>
                  <td>
                    <figure>
                      <img src={comic.thumbnailUrl} alt={comic.title} />
                    </figure>
                  </td>

                  <td>
                    <strong>{comic.title}</strong>
                  </td>

                  <td>
                    <span>{comic.id}</span>
                  </td>

                  <td>
                    <button>
                      Remover da Lista <MdDelete size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </S.ComicsTable>

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
