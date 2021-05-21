import { useEffect, useState } from 'react';
import Head from 'next/head';
import { APIComic, Comic } from '@types';
import api from 'services/api';
import Header from 'components/Header/Header';
import * as S from 'styles/pages/home.styles';
import mock from '../../mock.json';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';

export default function Home() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    async function fetchComics() {
      // buscando dados da API, tipando o retorno deles para depois transformá-los para o formato que o componente espera
      // const response = await api.get('/v1/public/comics?limit=16');
      const unformattedComics: APIComic[] = mock.results;

      const formatedComics: Comic[] = unformattedComics.map(comic => ({
        id: comic.id,
        title: comic.title,
        thumbnailUrl: `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`,
      }));

      setComics(formatedComics);
    }

    fetchComics();
  }, []);

  return (
    <>
      <Head>
        <title>ComicsExplorer | Home</title>
      </Head>

      <S.PageContainer>
        <Header />

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
                  <a className='add-to-list-a'>Adicionar à lista</a>
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
      </S.PageContainer>
    </>
  );
}
