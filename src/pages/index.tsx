import mock from '../../mock.json';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { APIComic, Comic } from '@types';
import api from 'services/api';
import { Toast } from 'plugins/sweetAlert';
import { useComicsListContext } from 'contexts/ComicsList.context';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';
import * as S from 'styles/pages/home.styles';

export default function Home() {
  const { addComic, removeComic, isComicAlreadyInList } = useComicsListContext();
  const [comics, setComics] = useState<Comic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    async function fetchComics() {
      // buscando dados da API, tipando o retorno deles para depois transformá-los para o formato que o componente espera
      const response = await api.get('/v1/public/comics', { params: { limit: 12 } });
      const unformattedComics: APIComic[] = mock.results;

      const formatedComics: Comic[] = unformattedComics.map(comic => ({
        id: comic.id,
        title: comic.title,
        thumbnailUrl: `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`,
        totalPageCount: comic.pageCount,
        creators: comic.creators.items.map(creator => creator.name),
      }));

      setComics(formatedComics);
    }

    fetchComics();
  }, []);

  const handleAddComicToList = (comic: Comic) => {
    addComic(comic);
    Toast.fire({
      icon: 'success',
      title: 'Adicionado com sucesso',
    });
  };

  const handleRemoveComicOfList = (comic: Comic) => {
    removeComic(comic);
    Toast.fire({
      icon: 'success',
      title: 'Removido com sucesso',
    });
  };

  return (
    <>
      <Head>
        <title>ComicsExplorer | Home</title>
      </Head>

      <S.HomeContainer>
        <S.HomeHeading>
          <h1>Quadrinhos</h1>

          <S.SearchBar isLoading={isLoading}>
            <input
              type='text'
              aria-details='Barra de busca'
              placeholder='Digite um quadrinho para buscar...'
            />
            <button>{isLoading ? <FaSpinner /> : <AiOutlineSearch />}</button>
          </S.SearchBar>
        </S.HomeHeading>

        <S.ComicsWrapper>
          {comics.map(comic => (
            <S.ComicBlock key={comic.id} thumbnail={comic.thumbnailUrl}>
              <h4>{comic.title}</h4>

              <div className='links-wrapper'>
                <a
                  className='add-to-list-a'
                  onClick={() =>
                    isComicAlreadyInList(comic)
                      ? handleRemoveComicOfList(comic)
                      : handleAddComicToList(comic)
                  }
                >
                  {isComicAlreadyInList(comic) ? 'Remover da lista' : 'Adicionar à lista'}
                </a>
                <a className='details-a'>Detalhes</a>
              </div>
            </S.ComicBlock>
          ))}
        </S.ComicsWrapper>

        <S.LoadMoreButton
          isLoadingMore={isLoadingMore}
          onClick={() => setIsLoadingMore(!isLoadingMore)}
        >
          {isLoadingMore ? 'Carregando...' : 'Carregar mais'}
        </S.LoadMoreButton>
      </S.HomeContainer>
    </>
  );
}
