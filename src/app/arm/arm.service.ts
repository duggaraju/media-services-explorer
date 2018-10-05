import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { flatMap,  map } from 'rxjs/operators';
import { TokenProvider } from '../token.provider';
import { AdalService } from '../aad/adal.service';
import { Subscription } from './subscription';
import { MediaAccountInfo } from './media.account.info';
import { MediaAccountKeys } from './media.account.keys';

@Injectable()
export class ArmService {

  public static readonly managementUrl: string = 'https://management.azure.com';
  public static readonly managementResource: string = 'https://management.azure.com/'

  public readonly armApiVersion = '2014-04-01';
  public readonly msApiVersion = '2015-10-01';
  private tokenProvider: TokenProvider;

  constructor(private http: Http, private adalService: AdalService) {
    this.tokenProvider = adalService.getTokenProvider(ArmService.managementResource);
  }


  public getSubscriptions(baseUrl?: string): Observable<Subscription[]> {
    const url = `${baseUrl || ArmService.managementUrl}/subscriptions?api-version=${this.armApiVersion}`;
    return this.tokenProvider.getAuthorizationHeaders().pipe(
        flatMap(headers => this.http.get(url, new RequestOptions({ headers: headers}))),
        map(response => response.json().value));
  }

  public getMediaAccounts(id: string, baseUrl?: string): Observable<MediaAccountInfo[]> {
    const url = `${baseUrl || ArmService.managementUrl}${id}/providers/microsoft.media/mediaservices?api-version=${this.msApiVersion}`;
    return this.tokenProvider.getAuthorizationHeaders().pipe(
        flatMap(headers => this.http.get(url, new RequestOptions({ headers: headers}))),
        map(response => response.json().value));
  }

  public getMediaAccountKeys(id: string, baseUrl?: string): Observable<MediaAccountKeys> {
    const url = `${baseUrl || ArmService.managementUrl}${id}/listKeys?api-version=${this.msApiVersion}`;
    return this.tokenProvider.getAuthorizationHeaders().pipe(
        flatMap(headers => this.http.post(url, null, new RequestOptions({ headers: headers}))),
        map(response => response.json()));
  }
}
