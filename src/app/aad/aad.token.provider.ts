import { TokenProvider } from '../token.provider';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { AadService } from './aad.service';

@Injectable()
export class AadTokenProvider implements TokenProvider {

    constructor(private aadService: AadService, private resource: string) {
    }

    getAuthorizationHeaders(): Observable<HttpHeaders> {
        const token = this.aadService.getCachedToken(this.resource);
        if (!token) {
            console.log(`acquiring token for resource:${this.resource}..`);
            return this.aadService.acquireToken(this.resource).pipe(map(tkn => this.createHeaders(tkn)));
        }
        console.log(`returnig cached token for resource ${this.resource} => ${token}`);
        return of(this.createHeaders(token));
    }

    private createHeaders(token: string): HttpHeaders {
        return new HttpHeaders({Authorization: `Bearer ${token}`});
    }
}
