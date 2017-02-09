import { Injectable } from '@angular/core';
import { AdalService } from './adal.service';
import { environment } from '../../environments/environment';


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
    public createContext(config: adalLib.Config): AdalService {
        return new AdalService(config);     
    }

    public createContextForUser(username: string) {
      let config:adal.Config = {
          clientId: environment.aadClientId,
          tenant: environment.aadTenant,
      }; 
      // this is not working with electron.   
      // config.popUp = true;
      return this.createContext(config);
    }
}