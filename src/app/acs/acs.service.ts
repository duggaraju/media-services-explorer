
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TokenProvider } from '../token.provider';
import { AcsCredentials } from './acs.credentials';

interface Token {
    access_token: string;
    expires_in: number;
    ExpirationDate: Date;
}

@Injectable()
export class AcsService implements TokenProvider {
    private token: Token;
    private baseUrl: string;

    constructor(private http: Http, private credentials: AcsCredentials) {
    }

    public getAuthorizationHeaders(): Observable<Headers>    {
        let now = new Date(Date.now() + 60000);
        if (!this.token || this.token.ExpirationDate < now) {
            console.log(`Needs to refresh token for ${this.credentials.primaryAuthAddress}`);
            return this.refreshToken()
            .map(token => this.getAuthHeader());
        }
        return Observable.of(this.getAuthHeader());
    }

    private refreshToken(): Observable<Token> {
        let url = this.credentials.primaryAuthAddress + "/v2/OAuth2-13";
        let body = `grant_type=client_credentials&client_id=${this.credentials.accountName}&client_secret=${encodeURIComponent(this.credentials.primaryKey)}&scope=${encodeURIComponent(this.credentials.scope)}`;
        let params = new URLSearchParams("", new QueryEncoder());
        params.set("grant_type", "client_credentials");
        params.set("scope", this.credentials.scope);
        params.set("client_id", this.credentials.accountName);
        params.set("client_secret", this.credentials.primaryKey);

        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("Accept", "application/json");
        
        let options = new RequestOptions( { headers: headers } );
        console.log("Refreshing token for " + url);
        return this.http.post(url, params.toString(), options)
            .map(res =>  {
                this.token = res.json() as Token;
                this.token.ExpirationDate = new Date(Date.now() + (1000 * this.token.expires_in));
                console.log(`got token at ${new Date()} for ${this.token.expires_in} seconds expiring at ${this.token.ExpirationDate}`);
                return this.token;
             });
    }

    private getAuthHeader(): Headers {
        let headers = new Headers();
        let headerValue = `Bearer ${this.token.access_token}`;
        headers.append("Authorization", headerValue);
        return headers;
    }
}