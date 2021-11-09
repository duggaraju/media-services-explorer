import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MediaAccountInfo } from './media.account.info';
import { SubscriptionClient } from '@azure/arm-subscriptions'
import { AadConfigService } from 'app/aad/aad.config.service';
import { Subscription, SubscriptionListResult } from '@azure/arm-subscriptions/esm/models';
import {  AzureMediaServices } from '@azure/arm-mediaservices'
import { ResourceManagementClient } from '@azure/arm-resources';
import { ResourceGroup } from '@azure/arm-resources/esm/models';

@Injectable()
export class ArmService {

  public static readonly managementUrl: string = 'https://management.azure.com';
  public readonly msApiVersion = '2015-10-01';

  constructor(private http: HttpClient, private authService: AadConfigService) {
  }

  public getSubscriptions(): Observable<Subscription[]> {
    const client = new SubscriptionClient(this.authService.getCredentials());
    const promise = client.subscriptions.list();
    return from(promise).pipe(map(response => response as SubscriptionListResult));
  }

  /*public getResourceGroups(): Observable<ResourceGroup> {
    const client = new ResourceManagementClient(this.authService.getCredentials());
    client.resources.list()
  }*/

  public getMediaAccounts(subscription: Subscription, baseUrl?: string): Observable<MediaAccountInfo[]> {
    const client = new AzureMediaServices(this.authService.getCredentials(), subscription.id ?? '');
    const promise = client.mediaservices.list('');
    const url = `${baseUrl || ArmService.managementUrl}${subscription.id}/providers/microsoft.media/mediaservices?api-version=${this.msApiVersion}`;
    from(promise).pipe(map(response => response));
    return this.http.get<any>(url).pipe(
        map(response => response.json().value));
  }

}
