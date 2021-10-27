import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Configuration } from '@azure/msal-browser';
import { TokenCredential } from '@azure/core-auth'
import { InteractiveBrowserCredential } from '@azure/identity'

@Injectable()
export class AadConfigService {
    constructor() {
    }

    public getConfig(): Configuration {
        const config: Configuration = {
            auth: {
                clientId: environment.aadClientId
            }
        };
        return config;
    }

    public getCredentials(): TokenCredential {
        return new InteractiveBrowserCredential( {
            clientId: environment.aadClientId
        })
    }
}
