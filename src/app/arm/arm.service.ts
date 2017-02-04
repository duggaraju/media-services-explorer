import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TokenProvider } from '../token.provider';
import { AdalService } from '../aad/adal.service';
import { Subscription } from './subscription';
import { MediaAccountInfo } from './media.account.info';
import { MediaAccountKeys } from './media.account.keys';

@Injectable()
export class ArmService {

  public readonly managementUrl: string = "https://management.azure.com";
  public readonly managementResource: string = "https://management.azure.com/"

  public readonly armApiVersion = "2014-04-01";
  public readonly msApiVersion = "2015-10-01";

  constructor(private http:Http) {
  }

  public getSubscriptions(adalService: AdalService, baseUrl?: string): Observable<Subscription[]> {
    let url = `${baseUrl || this.managementUrl}/subscriptions?api-version=${this.armApiVersion}`;
    let tokenProvider = adalService.getTokenProvider(this.managementResource);
    return tokenProvider.getAuthorizationHeaders()
        .flatMap(headers => this.http.get(url, new RequestOptions({ headers:headers})))
        .map(response => response.json().value);
  }

  public getMediaAccounts(adalService: AdalService, id: string, baseUrl?: string): Observable<MediaAccountInfo[]> {
    let url = `${baseUrl || this.managementUrl}${id}/providers/microsoft.media/mediaservices?api-version=${this.msApiVersion}`;
    let tokenProvider = adalService.getTokenProvider(this.managementResource);
    return tokenProvider.getAuthorizationHeaders()
        .flatMap(headers => this.http.get(url, new RequestOptions({ headers:headers})))
        .map(response => response.json().value);
  }

  public getMediaAccountKeys(adalService: AdalService, id: string, baseUrl?: string): Observable<MediaAccountKeys> {
    let url = `${baseUrl || this.managementUrl}${id}/listKeys?api-version=${this.msApiVersion}`;
    let tokenProvider = adalService.getTokenProvider(this.managementResource);
    return tokenProvider.getAuthorizationHeaders()
        .flatMap(headers => this.http.post(url, null, new RequestOptions({ headers:headers})))
        .map(response => response.json());    
  }
}
