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
  const [loadedAll, setLoadedAll] = useState(false); // estado que vai definir se já foi carregado todos os comics com o filtro escolhido
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    async function fetchComics() {
      // buscando dados da API, tipando o retorno deles para depois transformá-los para o formato que o componente espera
      setIsLoading(true);
      const response = await api.get('/v1/public/comics', { params: { limit: 12 } });

      // const response = { data: mock.response };

      const unformattedComics: APIComic[] = response.data.data.results;

      const formattedComics: Comic[] = unformattedComics.map(comic => ({
        id: comic.id,
        title: comic.title,
        thumbnailUrl: `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`,
        totalPageCount: comic.pageCount,
        creators: comic.creators.items.map(creator => creator.name),
      }));

      setIsLoading(false);
      setComics(formattedComics);
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

  const handleRemoveComicFromList = (comic: Comic) => {
    removeComic(comic);
    Toast.fire({
      icon: 'success',
      title: 'Removido com sucesso',
    });
  };

  const handleLoadMore = async () => {
    setIsLoadingMore(true);

    let requestParams: any = {
      limit: 12,
      offset: currentPage + 1,
    };

    if (searchQuery) {
      requestParams.titleStartsWith = searchQuery;
    }

    const response = await api.get('/v1/public/comics', {
      params: requestParams,
    });

    setCurrentPage(currentPage => currentPage + 1);
    const responseResults = response.data.data.results;

    // para setar o loadedAll, precisamos ver se tudo com o determinado filtro já foi carregado, basta verificar se a API retornou um array com tamanho maior que 0
    if (responseResults.length > 0) {
      const unformattedComics: APIComic[] = responseResults;

      const newComics: Comic[] = unformattedComics.map(comic => ({
        id: comic.id,
        title: comic.title,
        thumbnailUrl: `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`,
        totalPageCount: comic.pageCount,
        creators: comic.creators.items.map(creator => creator.name),
      }));

      setComics([...comics, ...newComics]);
    } else {
      setLoadedAll(true);
    }

    setIsLoadingMore(false);
  };

  const handleSearch = async () => {
    setCurrentPage(0);

    const response = await api.get('/v1/public/comics', {
      params: {
        limit: 12,
        offset: currentPage,
        titleStartsWith: searchQuery,
      },
    });

    const unformattedComics: APIComic[] = response.data.data.results;

    const newComics: Comic[] = unformattedComics.map(comic => ({
      id: comic.id,
      title: comic.title,
      thumbnailUrl: `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`,
      totalPageCount: comic.pageCount,
      creators: comic.creators.items.map(creator => creator.name),
    }));

    setComics(newComics);
  };

  return (
    <>
      <Head>
        <title>ComicsExplorer | Home</title>
      </Head>

      <S.HomeContainer>
        <S.HomeHeading>
          <h1>Quadrinhos</h1>

          <S.SearchBar
            data-testid='search-bar'
            isLoading={isLoadingSearch}
            data-is-loading={isLoadingSearch}
          >
            <input
              type='text'
              aria-details='Barra de busca'
              placeholder='Digite o título de um quadrinho para buscar...'
              onChange={event => setSearchQuery(event.target.value)}
            />
            <button title='Buscar' onClick={handleSearch}>
              {isLoadingSearch ? <FaSpinner /> : <AiOutlineSearch />}
            </button>
          </S.SearchBar>
        </S.HomeHeading>

        <S.ComicsWrapper data-testid='comics-wrapper'>
          {isLoading ? (
            <>
              {/* Renderizando 4 comics block vazios para fazer o shimmer effect */}
              <S.ComicBlock />
              <S.ComicBlock />
              <S.ComicBlock />
              <S.ComicBlock />
            </>
          ) : (
            comics.map(comic => (
              <S.ComicBlock key={comic.id} thumbnail={comic.thumbnailUrl}>
                <h4>{comic.title}</h4>

                <div className='links-wrapper'>
                  <a
                    className='remove-or-add-to-list'
                    onClick={() =>
                      isComicAlreadyInList(comic)
                        ? handleRemoveComicFromList(comic)
                        : handleAddComicToList(comic)
                    }
                  >
                    {isComicAlreadyInList(comic) ? 'Remover da lista' : 'Adicionar à lista'}
                  </a>
                  <a className='details'>Detalhes</a>
                </div>
              </S.ComicBlock>
            ))
          )}
        </S.ComicsWrapper>

        {/* O botão só será exibido se ainda não tiver carregado tudo */}
        {!loadedAll && !isLoading && (
          <S.LoadMoreButton isLoadingMore={isLoadingMore} onClick={handleLoadMore}>
            {isLoadingMore ? 'Carregando...' : 'Carregar mais'}
          </S.LoadMoreButton>
        )}
      </S.HomeContainer>
    </>
  );
}
