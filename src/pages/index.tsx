import { useEffect, useState } from 'react';
import Head from 'next/head';
import { APIComic, Comic } from '@types';
import api from 'services/api';
import mock from '../../mock.json';
import Header from 'components/Header/Header';
import * as S from 'styles/pages/home.styles';

export default function Home() {
  const [comics, setComics] = useState<Comic[]>([]);

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
          <h1>Quadrinhos</h1>

          <S.ComicsWrapper>
            {comics.map(comic => (
              <S.ComicBlock key={comic.id} thumbnail={comic.thumbnailUrl}>
                {/* <img src={comic.thumbnailUrl} alt={comic.title} /> */}
                <h4>{comic.title}</h4>

                <div className='links-wrapper'>
                  <a className='add-to-list-a'>Adicionar à lista</a>
                  <a className='details-a'>Detalhes</a>
                </div>
              </S.ComicBlock>
            ))}
          </S.ComicsWrapper>
        </S.HomeContainer>
      </S.PageContainer>
    </>
  );
}
