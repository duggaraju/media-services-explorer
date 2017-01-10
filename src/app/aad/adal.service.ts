import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as adalLib from 'adal-angular';
import { TokenProvider } from '../token.provider';
import { AadTokenProvider } from './aad.token.provider';

let constructorFn: adal.AuthenticationContextStatic = AuthenticationContext;
declare let Logging: adal.Logging;

@Injectable()
export class AdalService {

  private context: adal.AuthenticationContext;

  constructor() {
    console.log(`Creating ADAL service .... `);
    Logging = {
      log: (message) => console.log(message),
      level: 3
    };
  }

  public init(username?: string) : void {
    if (!this.context) {
      let config:adal.Config = {
              clientId: "789b7daa-39aa-4a80-925c-5af317dcbef1",
              tenant: "common"
              // tenant: username? username.substring(username.indexOf("@") + 1) : "common"
      };    
      (<any>config).popUp = true;
      // (<any>config).isAngular = true;
      //constructorFn = adalLib.constructor;
      this.context = new constructorFn(config);      
    } else {
      // this.context.config.tenant = username? username.substring(username.indexOf("@") + 1) : "common"
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

