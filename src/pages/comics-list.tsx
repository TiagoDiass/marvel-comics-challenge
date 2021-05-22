import Head from 'next/head';
import { BiMailSend } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { IoMdEye } from 'react-icons/io';
import { useComicsListContext } from 'contexts/ComicsList.context';
import * as S from 'styles/pages/comics-list.styles';

/**
 * @page Página ComicsList
 */
export default function ComicsList() {
  const { comicsList } = useComicsListContext();

  return (
    <>
      <Head>
        <title>ComicsExplorer | Lista de Quadrinhos</title>
      </Head>

      <S.ComicsListPageContainer>
        <h1>Sua lista de quadrinhos</h1>

        <S.ContentContainer>
          {comicsList.length ? (
            <>
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

                        <button>
                          Detalhes <IoMdEye size={16} />
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
            </>
          ) : (
            <h2 style={{ textAlign: 'center' }}>
              Ops... <br /> Parece que você ainda não adicionou nenhum quadrinho em sua lista
            </h2>
          )}
        </S.ContentContainer>
      </S.ComicsListPageContainer>
    </>
  );
}
