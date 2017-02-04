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

  private accounts: Account[];

  public getAccounts(): Account[] {
    if (!this.accounts) {
      this.loadAccounts();
    }
    return this.accounts;
  }

  public deleteAccount(account: Account): void {
    console.log(`Looking to delete account name:${account.name} of type:${AccountType[account.accountType]}`);
    let index = this.accounts.indexOf(account);
    if (index != -1) {
      console.log(`Deleting account name:${account.name} of type:${AccountType[account.accountType]}`);
      this.accounts.splice(index, 1);
      this.saveAccounts();
    }
  }

  public updateAccount(account: Account): boolean {
    let added = false;
    let actualAccount = this.accounts.find(element => element === account);
    if (actualAccount) {
      console.log(`Updating account:${account.name} type:${AccountType[account.accountType]}`)
    } else {
      console.log(`Adding account:${name} type:${AccountType[account.accountType]}`)
      this.accounts.push(account);
      added = true;
    }
    this.saveAccounts();
    return added;
  }

  public getMediaAccount(account:Account): MediaAccount {
    switch(account.accountType) {
        case AccountType.AcsAccount:
        case AccountType.ArmAccount:
            return this.getAcsAccount(account);
        case AccountType.AadAccount:
          throw new Error("Not yet supported!");
    }
  }

  private loadAccounts(): void {
    var accounts = localStorage.getItem("accounts");
    console.log(`found accounts in local storage ${accounts}`);
    if (accounts) {
      try {
        this.accounts = JSON.parse(accounts) as Account[];
      }
      catch(error) {
        console.log(`Invalid JSON saved so ignoring it. ${error}`);
      }
    }
    console.log(`Total accounts: ${this.accounts.length}`);
  }

  private saveAccounts(): void{
    console.log(`Saving Accounts.... Total: ${this.accounts.length}`);
    localStorage.setItem("accounts", JSON.stringify(this.accounts));    
  }

  private getAcsAccount(account: Account): MediaAccount {
    let properties = <AcsAccountProperties> account.properties;
    if (properties.mediaEnvironment !== MediaEnvironment.Custom) {
      let settings = this.acsEnvironments.get(properties.mediaEnvironment);
      Object.assign(properties, settings);
    }
    return <MediaAccount> {
      accountName: account.name,
      apiUrl: properties.apiEndpoints[0].endpoint,
      tokenProvider: new AcsService(this.http, this.getAcsCredentials(account, properties))
    };
  }

  private getAcsCredentials(account: Account, properties:AcsAccountProperties): AcsCredentials {
    return <AcsCredentials> {
      accountName: account.name,
      primaryKey: properties.primaryKey,
      scope: properties.scope,
      primaryAuthAddress: properties.primaryAuthEndpoint
    }
  }

  readonly acsEnvironments:Map<MediaEnvironment, AcsAccountProperties> = 
    new Map<MediaEnvironment, AcsAccountProperties>()
        .set(MediaEnvironment.Production, {
            apiEndpoints: [ { endpoint:"https://media.windows.net" }],
            scope: "urn:WindowsAzureMediaServices",
            primaryAuthEndpoint:  "https://wamsprodglobal001acs.accesscontrol.windows.net",
            secondaryAuthEndpoint: "https://wamsprodglobal002acs.accesscontrol.windows.net"
        }).set(MediaEnvironment.Mooncake, {
            apiEndpoints: [ { endpoint: "https://media.chinacloud.cn" }],
            scope: "urn:WindowsAzureMediaServices",
            primaryAuthEndpoint: "https://"
        }).set(MediaEnvironment.BlackForest, {
          apiEndpoints: [],
          scope: "urn.WindowsAzureMediaServices",
          primaryAuthEndpoint: "",
          secondaryAuthEndpoint: ""
        });  
}
