import { TestBed, async, inject } from '@angular/core/testing';

import { OAuthCallbackGuard } from './oauth-callback.guard';

describe('OauthCallbackGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OAuthCallbackGuard]
    });
  });

  it('should ...', inject([OAuthCallbackGuard], (guard: OAuthCallbackGuard) => {
    expect(guard).toBeTruthy();
  }));
});
