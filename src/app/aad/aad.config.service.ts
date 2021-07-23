import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Configuration } from '@azure/msal-browser';

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
}
