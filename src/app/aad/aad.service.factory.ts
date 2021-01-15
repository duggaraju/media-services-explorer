import { Injectable } from '@angular/core';
import { AadService } from './aad.service';
import { AadConfigService } from './aad.config.service';
import { environment } from '../../environments/environment';
import { Configuration } from 'msal';

@Injectable()
export class AadServiceFactory {

    private contextMap = new Map<string, AadService>();

    constructor(private configService: AadConfigService) {
    }

    private createService(): AadService {
        return new AadService(this.configService);
    }

    public handleCallback(): void {
        this.contextMap.forEach(context => {
            context.handleWindowCallback();
        });
    }

    public getContextForUser(username: string): AadService {
        return this.createServiceForDomain(username.substring(username.indexOf('@')));
    }

    public createServiceForDomain(domain: string): AadService {
        let context = this.contextMap.get(domain);
        if (!context) {
            context = this.createService();
        }
        return context;
    }
}
