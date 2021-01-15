/// <reference types="adal" />
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Configuration, AuthenticationParameters } from 'msal';

@Injectable()
export class AadConfigService {
    constructor() {
        if (environment.aadLogging) {
            const logging = {
                log: (message: string) => console.log(message),
                level: environment.aadLogLevel
            };
        }
    }

    public getConfig(): Configuration {
        const config: Configuration = {
            auth: {
                clientId: environment.aadClientId
            }
        };
        return config;
    }

    public getConfigForDomain(domain: string): Configuration {
        return this.getConfig();
    }

    public getAuthenticationParameters(resource: string): AuthenticationParameters {
        return {
            scopes: [ resource ]
        };
    }
}
