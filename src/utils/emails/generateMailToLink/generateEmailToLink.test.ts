import generateMailToLink from './generateMailToLink';

describe('generateEmailToLink helper', () => {
  it('should generate MailTo link correctly', () => {
    const mailToLink = generateMailToLink({
      to: 'tiago@gmail.com',
      subject: 'Assunto legal',
      body: 'Corpo',
    });

    expect(mailToLink).toBe('mailto:tiago@gmail.com?subject=Assunto legal&body=Corpo');
  });
});
