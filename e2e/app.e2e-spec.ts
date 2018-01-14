import { AteljePage } from './app.po';

describe('atelje App', () => {
  let page: AteljePage;

  beforeEach(() => {
    page = new AteljePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
