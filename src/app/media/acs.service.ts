
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MediaAccount } from './mediaaccount';

interface Token {
    access_token: string;
    expires_in: number;
    ExpirationDate: Date;
}

@Injectable()
export class AcsService {
    private token: Token;
    private baseUrl: string;

    constructor(private http: Http, private jsonp:Jsonp, private account: MediaAccount) {
    }

    public getAccessToken(): Observable<Headers>    {
        let now = new Date(Date.now() + 60000);
        if (!this.token || this.token.ExpirationDate < now) {
            console.log(`Needs to refresh token for ${this.account.acsBaseAddress[0]}`);
            return this.refreshToken()
            .map(token => this.getAuthHeader());
        }
        return Observable.of(this.getAuthHeader());
    }

    private refreshToken(): Observable<Token> {
        let url = this.account.acsBaseAddress[0] + "/v2/OAuth2-13";
        let body = `grant_type=client_credentials&client_id=${this.account.accountName}&client_secret=${encodeURIComponent(this.account.accountKey)}&scope=${encodeURIComponent(this.account.scope)}`;

        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("Accept", "application/json");
        
        let options = new RequestOptions( { headers: headers } );
        console.log("Refreshing token for " + url);
        return this.http.post(url, body, options)
            .map(res =>  {
                this.token = res.json() as Token;
                this.token.ExpirationDate = new Date(Date.now() + (1000 * this.token.expires_in));
                console.log(`got token at ${new Date()} for ${this.token.expires_in} seconds expiring at ${this.token.ExpirationDate}`);
                return this.token;
             });
    }

    private getToken(url: string): Observable<Token> {
        let body = `grant_type=client_credentials&client_id=${this.account.accountName}&client_secret=${encodeURIComponent(this.account.accountKey)}&scope=${encodeURIComponent(this.account.scope)}`;

        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("Accept", "application/json");
        
        let options = new RequestOptions( { headers: headers } );
        console.log("Refreshing token for " + url);
        return this.http.post(url + "/v2/OAuth2-13", body, options)
            .map(res =>  {
                this.token = res.json() as Token;
                this.token.ExpirationDate = new Date(Date.now() + (1000 * this.token.expires_in));
                console.log(`got token for ${this.token.expires_in} seconds ${this.token.ExpirationDate}`);
                return this.token;
             });

    }

    private refreshTokenByJsonp(): Observable<Token> {
        let url = this.account.acsBaseAddress[0] + "/v2/OAuth2-13";
        let body = `grant_type=client_credentials&client_id=${this.account.accountName}&client_secret=${encodeURIComponent(this.account.accountKey)}&scope=${encodeURIComponent(this.account.scope)}`;

        let headers = new Headers();
        headers.append("Accept", "application/json");
        
        let options = new RequestOptions( { headers: headers, search: body } );
        console.log("Refreshing token for " + url);
        return this.jsonp.get(url, options)
            .map(res =>  {
                this.token = res.json() as Token;
                this.token.ExpirationDate = new Date(Date.now() + (1000 * this.token.expires_in));
                console.log(`got token for ${this.token.expires_in} seconds ${this.token.ExpirationDate}`);
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