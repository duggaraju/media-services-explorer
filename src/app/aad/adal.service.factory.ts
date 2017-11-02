import { Injectable } from '@angular/core';
import { AdalService } from './adal.service';
import { environment } from '../../environments/environment';
import * as adal from 'adal-angular/lib/adal';

declare var Logging: adal.Logging;

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
        return this.createContextForDomain(username.substring(username.indexOf('@')));
    }

    public createContextForDomain(domain: string) {
        const config: adal.Config = {
            clientId: environment.aadClientId,
            tenant: environment.aadTenant,
        };
        config.popUp = environment.popUp;
        return this.createContext(config);
    }
}
