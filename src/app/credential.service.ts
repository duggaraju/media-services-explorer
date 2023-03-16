import { Injectable } from '@angular/core';
import { InteractiveBrowserCredential, InteractiveBrowserCredentialInBrowserOptions, TokenCredential } from '@azure/identity';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  private _options: InteractiveBrowserCredentialInBrowserOptions = {
    //clientId: 'd482072a-8945-4daf-add7-0ef022e7072e',
    clientId: '2df1b6c9-1406-40f9-a730-b5d0462c651c',
    tenantId: '69fb40d6-e83e-4f50-b89a-cc772b5e0c58', 
    //loginStyle: 'redirect',
  };

  private _credential: TokenCredential;


  constructor() {
    this._credential = new InteractiveBrowserCredential(this._options);
  }

  public get credential(): TokenCredential {
    return this._credential;
  }
}
