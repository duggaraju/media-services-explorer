import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Account, AcsAccountProperties } from './account';
import { AccountType } from './account.type';
import { MediaAccount } from './media/mediaaccount';
import { TokenProvider } from './token.provider';
import { AcsService } from './acs/acs.service';
import { AadTokenProvider } from './aad/aad.token.provider';
import { AdalService } from './aad/adal.service';
import { AcsCredentials } from './acs/acs.credentials';
import { MediaEnvironment } from './mediaenvironment';


@Injectable()
export class AccountService {

  constructor(private http:Http) { }

  public getMediaAccount(account:Account): MediaAccount {
    switch(account.accountType) {
        case AccountType.AcsAccount:
            return this.getAcsAccount(account);
    }
  }

  private getAcsAccount(account: Account): MediaAccount {
    let properties = <AcsAccountProperties> account.properties;
    if (properties.mediaEnvironment !== MediaEnvironment.Custom) {
      let settings = this.acsEnvironments.get(properties.mediaEnvironment);
      Object.assign(properties, settings);
    }
    return <MediaAccount> {
      accountName: account.name,
      apiUrl: properties.endpoints[0].endpoint,
      tokenProvider: new AcsService(this.http, this.getAcsCredentials(account, properties))
    };
  }

  private getAcsCredentials(account: Account, properties:AcsAccountProperties): AcsCredentials {
    return <AcsCredentials> {
      accountName: account.name,
      primaryKey: properties.primaryKey,
      scope: properties.scope,
      primaryAuthAddress: properties.primaryAuthAddress
    }
  }

  readonly acsEnvironments:Map<MediaEnvironment, AcsAccountProperties> = 
    new Map<MediaEnvironment, AcsAccountProperties>()
        .set(MediaEnvironment.Production, {
            endpoints: [ { endpoint:"https://media.windows.net" }],
            scope: "urn:WindowsAzureMediaServices",
            primaryAuthAddress:  "https://wamsprodglobal001acs.accesscontrol.windows.net",
            secondaryAuthAddress: "https://wamsprodglobal002acs.accesscontrol.windows.net"
        }).set(MediaEnvironment.Mooncake, {
            endpoints: [ { endpoint: "https://media.chinacloud.cn" }],
            scope: "urn:WindowsAzureMediaServices",
            primaryAuthAddress: "https://"
        }).set(MediaEnvironment.BlackForest, {
          endpoints: [],
          scope: "urn.WindowsAzureMediaServices",
          primaryAuthAddress: "",
          secondaryAuthAddress: ""
        });  
}
