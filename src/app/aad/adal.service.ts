/// <reference types="adal" />
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { TokenProvider } from '../token.provider';
import { AadTokenProvider } from './aad.token.provider';
import * as adalLib from 'adal-angular/lib/adal';
import { AdalConfigService } from 'app/aad/adal.config.service';

const constructorFn: adal.AuthenticationContextStatic = adalLib;

@Injectable()
export class AdalService {

  private context: adal.AuthenticationContext;

  constructor(private configService: AdalConfigService) {
    this.context = new constructorFn(configService.getConfig());
  }

  public login(): void {
    this.context.login();
  }

  public handleWindowCallback(hash?: string): void  {
    this.context.handleWindowCallback();
  }

  public getCachedUser(): adal.User  {
    return this.context.getCachedUser();
  }

  public getCachedToken(resource: string): string {
    return this.context.getCachedToken(resource);
  }

  public acquireToken(resource: string): Observable<string> {
    const token = this.context.getCachedToken(resource);
    if (token) {
      return Observable.of(token);
    }
    const acquireToken = Observable.bindCallback(this.context.acquireToken.bind(this.context, resource), this.tokenSelector);
    return acquireToken().catch(err => {
      console.log(`acquire token failed try interactive!!`);
      const acquireTokenPopup = Observable.bindCallback(
        (<any>this.context).acquireTokenRedirect.bind(this.context, resource, undefined, undefined),
        this.tokenSelector);
        // return acquireTokenPopup();
        return 'Error';
    });
  }

  public acquireTokenInteractive(resource: string): void {
    console.log(`acquire token failed try interactive!!`);
      (<any>this.context).acquireTokenRedirect(resource, undefined, undefined);
  }

  private tokenSelector(errMesg: string, token: string): string {
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

