import { IdpSeedPage } from './app.po';

describe('idp-seed App', () => {
  let page: IdpSeedPage;

  beforeEach(() => {
    page = new IdpSeedPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
