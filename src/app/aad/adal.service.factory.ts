import { Injectable } from '@angular/core';
import { AdalService } from './adal.service';
import { environment } from '../../environments/environment';

let Logging: adal.Logging;

@Injectable()
export class AdalServiceFactory {

    constructor() {
        if (environment.adalLogging) {
            Logging = {
                log: (message) => console.log(message),
                level: environment.adalLogLevel
            };
        }        
    }
    public createContext(config: adal.Config): AdalService {
        return new AdalService(config);     
    }

    public createContextForUser(username: string) {
      let config:adal.Config = {
          clientId: environment.aadClientId,
          tenant: environment.aadTenant,
      };    
      // (<any>config).popUp = true;
      return this.createContext(config);
    }
}