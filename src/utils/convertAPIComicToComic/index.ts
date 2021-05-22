import { APIComic, Comic } from '@types';

export default function convertAPIComicToComic(APIComic: APIComic): Comic {
  return {
    id: APIComic.id,
    title: APIComic.title,
    creators: APIComic.creators.items.map(creator => creator.name),
    description: APIComic.description || 'Sem descrição na base de dados',
    totalPageCount: APIComic.pageCount,
    thumbnailUrl: `${APIComic.thumbnail.path}/portrait_uncanny.${APIComic.thumbnail.extension}`,
  };
}
