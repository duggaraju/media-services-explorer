import { Injectable } from '@angular/core';
import { InteractiveBrowserCredential, InteractiveBrowserCredentialInBrowserOptions, TokenCredential } from '@azure/identity';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  private _options: InteractiveBrowserCredentialInBrowserOptions = {
    clientId: '',
    tenantId: 'common',
    
  };

  private _credential: TokenCredential;


  constructor() {
    this._credential = new InteractiveBrowserCredential(this._options);
  }

  public get credential(): TokenCredential {
    return this._credential;
  }
}
