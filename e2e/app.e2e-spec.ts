import { FinheartbelPage } from './app.po';

describe('finheartbel App', () => {
  let page: FinheartbelPage;

  beforeEach(() => {
    page = new FinheartbelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
