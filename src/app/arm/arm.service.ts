import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap,  map } from 'rxjs/operators';
import { TokenProvider } from '../token.provider';
import { AadService } from '../aad/aad.service';
import { Subscription } from './subscription';
import { MediaAccountInfo } from './media.account.info';
import { MediaAccountKeys } from './media.account.keys';

@Injectable()
export class ArmService {

  public static readonly managementUrl: string = 'https://management.azure.com';
  public static readonly managementResource: string = 'https://management.azure.com/';

  public readonly armApiVersion = '2014-04-01';
  public readonly msApiVersion = '2015-10-01';
  private tokenProvider: TokenProvider;

  constructor(private http: HttpClient, private aadService: AadService) {
    this.tokenProvider = aadService.getTokenProvider(ArmService.managementResource);
  }


  public getSubscriptions(baseUrl?: string): Observable<Subscription[]> {
    const url = `${baseUrl || ArmService.managementUrl}/subscriptions?api-version=${this.armApiVersion}`;
    return this.tokenProvider.getAuthorizationHeaders().pipe(
        mergeMap(headers => this.http.get<any>(url, { headers })),
        map(response => response.value));
  }

  public getMediaAccounts(id: string, baseUrl?: string): Observable<MediaAccountInfo[]> {
    const url = `${baseUrl || ArmService.managementUrl}${id}/providers/microsoft.media/mediaservices?api-version=${this.msApiVersion}`;
    return this.tokenProvider.getAuthorizationHeaders().pipe(
        mergeMap(headers => this.http.get<any>(url, { headers })),
        map(response => response.json().value));
  }

  public getMediaAccountKeys(id: string, baseUrl?: string): Observable<MediaAccountKeys> {
    const url = `${baseUrl || ArmService.managementUrl}${id}/listKeys?api-version=${this.msApiVersion}`;
    return this.tokenProvider.getAuthorizationHeaders().pipe(
        mergeMap(headers => this.http.post<any>(url, null, { headers })));
  }
}
