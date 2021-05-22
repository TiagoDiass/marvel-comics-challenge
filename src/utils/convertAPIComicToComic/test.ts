import { mockApiComic } from 'utils/tests.utils';
import convertAPIComicToComic from '.';

describe('ConvertAPIComicToComic util', () => {
  it('should convert an APIComic to a Comic correctly', () => {
    const APIComic = mockApiComic({});

    const convertedComic = convertAPIComicToComic(APIComic);

    expect(convertedComic).toEqual({
      id: APIComic.id,
      title: APIComic.title,
      description: APIComic.description,
      thumbnailUrl: `${APIComic.thumbnail.path}/portrait_uncanny.${APIComic.thumbnail.extension}`,
      totalPageCount: APIComic.pageCount,
      creators: APIComic.creators.items.map(creator => creator.name),
    });
  });

  it('should set description to a default value if the description from API is falsy', () => {
    const APIComic = mockApiComic({});

    APIComic.description = null;

    const convertedComic = convertAPIComicToComic(APIComic);

    expect(convertedComic).toEqual({
      id: APIComic.id,
      title: APIComic.title,
      description: 'Sem descrição na base de dados',
      thumbnailUrl: `${APIComic.thumbnail.path}/portrait_uncanny.${APIComic.thumbnail.extension}`,
      totalPageCount: APIComic.pageCount,
      creators: APIComic.creators.items.map(creator => creator.name),
    });
  });
});
