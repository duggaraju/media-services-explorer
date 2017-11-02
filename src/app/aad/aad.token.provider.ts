import { TokenProvider } from '../token.provider';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import { AdalService } from './adal.service';

@Injectable()
export class AadTokenProvider implements TokenProvider {

    constructor(private adalService: AdalService, private resource: string) {
    }

    getAuthorizationHeaders(): Observable<Headers> {
        this.adalService.getCachedUser();
        const token = this.adalService.getCachedToken(this.resource);
        if (!token) {
            console.log(`acquiring token for resource:${this.resource}..`);
            return this.adalService.acquireToken(this.resource).map(tkn => this.createHeaders(tkn));
        }
        console.log(`returnig cached token for resource ${this.resource} => ${token}`);
        return Observable.of(this.createHeaders(token));
    }

    private createHeaders(token: string): Headers {
        return new Headers({'Authorization': `Bearer ${token}`});
    }
}
