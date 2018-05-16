import { Injectable } from '@angular/core';
import { AdalService } from './adal.service';
import { environment } from '../../environments/environment';
import * as adal from 'adal-angular/lib/adal';

@Injectable()
export class AdalServiceFactory {

    private contextMap = new Map<string, AdalService>();

    constructor() {
    }

    private createContext(config: adal.Config): AdalService {
        return new AdalService(config);
    }

    public handleCallback(): void {
        this.contextMap.forEach(context => {
            context.handleWindowCallback();
        })
    }

    public getContextForUser(username: string) {
        return this.createContextForDomain(username.substring(username.indexOf('@')));
    }

    public createContextForDomain(domain: string) {
        let context = this.contextMap.get(domain);
        if (!context) {
            const config: adal.Config = {
                clientId: environment.aadClientId,
                tenant: environment.aadTenant,
                popUp: environment.popUp
            };
            context = this.createContext(config);
        }
        return context;
    }
}
