import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
// import * as adalLib from 'adal-angular';
import { TokenProvider } from '../token.provider';
import { AadTokenProvider } from './aad.token.provider';
import { environment } from '../../environments/environment';

let constructorFn: adal.AuthenticationContextStatic = AuthenticationContext;
declare let Logging: adal.Logging;

@Injectable()
export class AdalService {

  private context: adal.AuthenticationContext;

  constructor() {
    if (environment.adalLogging) {
      Logging = {
        log: (message) => console.log(message),
        level: environment.adalLogLevel
      };
    }
  }

  public init(username?: string) : void {
    if (!this.context) {
      let config:adal.Config = {
              clientId: environment.aadClientId,
              tenant: environment.aadTenant,
              extraQueryParameter: `login_hint=${encodeURIComponent(username)}`
      };    
      (<any>config).popUp = true;
      // (<any>config).isAngular = true;
      //constructorFn = adalLib.constructor;
      this.context = new constructorFn(config);      
    }
  }

  public login(): void {
    this.context.login();
  }

  public handleWindowCallback(hash?:string): void  {
    this.context.handleWindowCallback(hash);
  }

  public getCachedUser(): adal.User  {
    return this.context.getCachedUser();
  }
  public getCachedToken(resource: string): string {
    return this.context.getCachedToken(resource);
  }

  public acquireToken(resource: string): Observable<string> {
    let acquireToken = Observable.bindCallback(this.context.acquireToken.bind(this.context, resource), this.tokenSelector);
    return acquireToken();
  }

  private tokenSelector(errMesg: string, token: string) {
    console.log(`Acquire token callback: Error:${errMesg}, token:${token}`)
    if (errMesg) {
      throw new Error(errMesg);
    }
    return token;
  }

  public loginInProgress(): boolean {
    return this.context.loginInProgress();
  }

  public getTokenProvider(resource: string): TokenProvider {
    return new AadTokenProvider(this, resource);
  }
}

