
import { Injectable } from '@angular/core';
import { TokenProvider } from '../token.provider';
import { Http, Headers, RequestOptions, RequestMethod, Request, Response, URLSearchParams } from '@angular/http';
import { MediaAccount } from './mediaaccount';
import { Observable } from 'rxjs/Rx';
import { MediaQuery } from "./mediaquery";
import { QueryResult } from "./queryresult";
import { MediaEntity } from './media.entity';

@Injectable()
export class MediaEntityService<T extends MediaEntity> {
    private defaultHeaders: Headers;
    
    constructor(private http: Http, private account: MediaAccount, private apiUrl: string, private entityName: string) {
        this.defaultHeaders = new Headers( {
            "Accept": "application/json",
            "x-ms-version": account.apiVersion
        });
    }

    private getRequestOptions(headers: Headers): RequestOptions {
        let options = new RequestOptions( { headers: this.defaultHeaders });
        headers.forEach( (values: string[], name) => options.headers.set(name, values));
        return options;
    }

    /**
     * Queries entities
     */
    query(query?:MediaQuery): Observable<QueryResult<T>> {
        let entityUrl = `${this.apiUrl}/${this.entityName}`;
        return this.account.tokenProvider.getAuthorizationHeaders()
            .flatMap(headers =>  {
                var options = this.getRequestOptions(headers);
                if (query) {
                    options.search = this.buildSearch(query);
                }
                console.log(`querying ${entityUrl}`);
                return this.http.get(entityUrl, options);
            }).map(response => {
                let json = response.json();
                return <QueryResult<T>> {
                    count: parseInt(json["odata.count"], 10),
                    value: json.value
                };
            });
    }

    create(entity: T): Observable<boolean> {
        let entityUrl = `${this.apiUrl}/${this.entityName}`;
        return this.account.tokenProvider.getAuthorizationHeaders()
            .flatMap(headers =>  {
                var options = this.getRequestOptions(headers);
                console.log(`querying ${entityUrl}`);
                return this.http.post(entityUrl, entity, options);
            }).map(response => {
                return true;
            });
    }

    delete(entity: T): Observable<boolean> {
        let entityUrl = `${this.apiUrl}/${this.entityName}(${entity.Id})`;
        return this.account.tokenProvider.getAuthorizationHeaders()
            .flatMap(headers =>  {
                var options = this.getRequestOptions(headers);
                console.log(`querying ${entityUrl}`);
                return this.http.delete(entityUrl, options);
            }).map(response => {
                return true;
            });
    }

    update(entity: T): Observable<boolean> {
        let entityUrl = `${this.apiUrl}/${this.entityName}(${entity.Id})`;
        return this.account.tokenProvider.getAuthorizationHeaders()
            .flatMap(headers =>  {
                var options = this.getRequestOptions(headers);
                console.log(`querying ${entityUrl}`);
                return this.http.put(entityUrl, options);
            }).map(response => {
                return true;
            });
    }

    executeOperation(entity: T, operation: string, operationParams?: any): Observable<any> {
        let entityUrl = `${this.apiUrl}/${this.entityName}(${entity.Id})/${operation}`;
        return this.account.tokenProvider.getAuthorizationHeaders()
            .flatMap(headers =>  {
                var options = this.getRequestOptions(headers);
                console.log(`querying ${entityUrl}`);
                return this.http.post(entityUrl, operationParams, options);
            }).map(response => {
                return response.json();
            });
    }

    private buildSearch(query: MediaQuery): URLSearchParams {
        var params = new URLSearchParams();
        params.set("$inlinecount", "allpages");
        params.set("$top", query.top.toString());
        params.set("$skip", query.skip.toString());
        params.set("$filter", query.query.toString());
        return params;
    }
}