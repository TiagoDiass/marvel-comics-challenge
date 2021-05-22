import { Comic } from '@types';
import generateEmailBody from './generateEmailBody';

describe('generateEmailBody helper', () => {
  it('should generate email body correctly', () => {
    const comics: Comic[] = [
      {
        id: 123,
        creators: ['Tiago Dias'],
        title: 'A morte de Thanos',
        description: 'Thanos morre ao Tony Stark estalar os dedos com a manopla do infinito',
        thumbnailUrl: '',
        totalPageCount: 100,
      },
      {
        id: 124,
        creators: ['Stan Lee'],
        title: 'A volta dos Guardiões da Galáxia',
        description: '',
        thumbnailUrl: '',
        totalPageCount: 100,
      },
    ];

    const emailBody = generateEmailBody(comics).split('\n');

    expect(emailBody[0]).toBe('');
    expect(emailBody[1]).toBe('  Ei, tudo bem?');
    expect(emailBody[2]).toBe('  Olha só esses quadrinhos da Marvel:');
    expect(emailBody[3]).toBe('  - Título: A morte de Thanos | Criado por: Tiago Dias');
    expect(emailBody[4]).toBe('- Título: A volta dos Guardiões da Galáxia | Criado por: Stan Lee');
  });
});
