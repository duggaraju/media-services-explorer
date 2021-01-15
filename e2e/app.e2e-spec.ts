import { MediaServicesExplorerPage } from './app.po';

describe('media-services-explorer App', function() {
  let page: MediaServicesExplorerPage;

  beforeEach(() => {
    page = new MediaServicesExplorerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
