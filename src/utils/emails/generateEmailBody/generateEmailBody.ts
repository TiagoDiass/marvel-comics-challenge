import { Comic } from '@types';

export default function generateEmailBody(comics: Comic[]) {
  return `
  Ei, tudo bem?
  Olha só esses quadrinhos da Marvel:
  ${comics
    .map(comic => `- Título: ${comic.title} | Criado por: ${comic.creators.join(', ')}`)
    .join('\n')}
  `;
}
