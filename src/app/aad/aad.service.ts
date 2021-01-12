/// <reference types="adal" />
import { Injectable } from '@angular/core';
import { Observable, of, from,  } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenProvider } from '../token.provider';
import { AadTokenProvider } from './aad.token.provider';
import { UserAgentApplication, Account, AuthResponse, AuthError, AuthenticationParameters } from 'msal';
import { AadConfigService } from 'app/aad/aad.config.service';
import { Configuration } from 'msal';

@Injectable()
export class AadService {

  private application: UserAgentApplication;
  private response?: AuthResponse;

  constructor(private configService: AadConfigService) {
    this.application = new UserAgentApplication(configService.getConfig());
  }

  public login(): void {
    this.application.loginRedirect();
  }

  public handleWindowCallback(hash?: string): void  {
    this.application.handleRedirectCallback((error, response) => {
      if (error) {
        throw new Error(`${error.errorMessage} = ${error.errorMessage}`);
      }
      this.response = response;
    });
  }

  public getCachedUser(): Account  {
    return this.application.getAccount();
  }

  public getCachedToken(resource: string): string | undefined {
    return this.response?.accessToken;
  }

  public acquireToken(resource: string): Observable<string> {
    const parameters: AuthenticationParameters = {
      scopes: [ resource ]
    };

    const promise = this.application.acquireTokenSilent(parameters);
    return from(promise).pipe(map(response => {
      if (response.accessToken) {
        return response.accessToken;
      } else {
        console.log(`acquire token failed try interactive!!`);
        this.application.acquireTokenPopup(parameters);
        return '';
      }
    }));
  }

  public loginInProgress(): boolean {
    return this.application.getLoginInProgress();
  }

  public getTokenProvider(resource: string): TokenProvider {
    return new AadTokenProvider(this, resource);
  }
}

