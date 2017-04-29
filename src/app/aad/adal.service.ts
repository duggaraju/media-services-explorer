import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { TokenProvider } from '../token.provider';
import { AadTokenProvider } from './aad.token.provider';
import { environment } from '../../environments/environment';
import  * as adalLib from 'adal-angular/lib/adal';

let constructorFn: adalLib.AuthenticationContextStatic = adalLib;

@Injectable()
export class AdalService {

  private context: adalLib.AuthenticationContext;

  constructor(private config: adalLib.Config) {
    this.context = new constructorFn(config);
  }

  public login(): void {
    this.context.login();
  }

  public handleWindowCallback(hash?:string): void  {
    this.context.handleWindowCallback(hash);
  }

  public getCachedUser(): adalLib.User  {
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

