import { Injectable } from '@angular/core';
import { TokenCredential, AccessToken } from '@azure/core-auth';
import { InteractiveBrowserCredential} from '@azure/identity';
import { AuthenticationResult, InteractionRequiredAuthError, IPublicClientApplication, SilentRequest } from '@azure/msal-browser';
import { MsalService } from '@azure/msal-angular';

class BrowserCredential implements TokenCredential {
  private hasAuthenticated: boolean = false;

  constructor(private publicApp: IPublicClientApplication) {
  }

  // Either confirm the account already exists in memory, or tries to parse the redirect URI values.
  async prepare(): Promise<void> {
    try {
      if (await this.publicApp.getActiveAccount()) {
        this.hasAuthenticated = true;
        return;
      }
      await this.publicApp.handleRedirectPromise();
      this.hasAuthenticated = true;
    } catch (e) {
      console.error("BrowserCredential prepare() failed", e);
    }
  }

  // Should be true if prepare() was successful.
  isAuthenticated(): boolean {
    return this.hasAuthenticated;
  }

  static updateScopes(scopes: string | string[]): string[] {
    scopes = Array.isArray(scopes) ? scopes : [scopes];
    //scopes = scopes.map(scope => scope.replace('/.default', '//.default'));
    return scopes;
  }

  // If called, triggers authentication via redirection.
  async loginRedirect(scopes: string | string[]): Promise<void> {
    scopes = BrowserCredential.updateScopes(scopes);
    const loginRequest = {
      scopes
    };
    await this.publicApp.loginRedirect(loginRequest);
  }

  // Tries to retrieve the token without triggering a redirection.
  async getToken(scopes: string | string[]): Promise<AccessToken> {
    if (!this.hasAuthenticated) {
      await this.prepare();
      //throw new Error("Authentication required");
    }

    const account = await this.publicApp.getActiveAccount();
    const parameters: SilentRequest = {
      account: account ?? undefined,
      scopes:  BrowserCredential.updateScopes(scopes)
    };

    let result: AuthenticationResult;
    try {
      result = await this.publicApp.acquireTokenSilent(parameters);
    } catch (e) {
      if (e instanceof InteractionRequiredAuthError) {
        result = await this.publicApp.acquireTokenPopup(parameters);
      } else {
        throw e;
      }
    }
    return {
      token: result.accessToken,
      expiresOnTimestamp: (result.expiresOn ?? new Date()).getTime()
    };  
  }
}

@Injectable()
export class AadConfigService {
    constructor(private msalService: MsalService) {
    }

    public getCredentials(): TokenCredential {
        return new InteractiveBrowserCredential();
    }
}
