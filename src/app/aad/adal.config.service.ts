/// <reference types="adal" />
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as adal from 'adal-angular/lib/adal';

declare var Logging: adal.Logging;

@Injectable()
export class AdalConfigService {
    constructor() {
        if (environment.adalLogging) {
            Logging = {
                log: (message) => console.log(message),
                level: environment.adalLogLevel
            };
        }
    }

    public getConfig(): adal.Config {
        const config: adal.Config = {
            clientId: environment.aadClientId,
            tenant: environment.aadTenant,
            popUp: environment.popUp
        };
        return config;
    }
}
