
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MediaAccount } from './mediaaccount';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { MediaQuery } from './mediaquery';
import { QueryResult } from './queryresult';
import { MediaEntity } from './media.entity';
import { MediaService } from './media.service';

@Injectable()
export class MediaEntityService<T extends MediaEntity> {
    private defaultHeaders: Map<string, string>;

    constructor(private http: HttpClient, private account: MediaAccount, private apiUrl: string, private entityName: string) {
        this.defaultHeaders = new Map( [
            [ 'Accept', 'application/json' ],
            [ 'x-ms-version', account.apiVersion || MediaService.defaultVersion ]
        ]);
    }

    private getRequestHeaders(headers: HttpHeaders): HttpHeaders {
        this.defaultHeaders.forEach( (value, name) => headers.set(name, value));
        return headers;
    }

    /**
     * Queries entities
     */
    query(query?: MediaQuery): Observable<QueryResult<T>> {
        const entityUrl = `${this.apiUrl}/${this.entityName}`;
        return this.account.tokenProvider.getAuthorizationHeaders().pipe(
            mergeMap(headers =>  {
                const options = {
                    headers: this.getRequestHeaders(headers),
                    params: query ? this.buildSearch(query) : undefined
                };
                console.log(`querying ${entityUrl}`);
                return this.http.get<any>(entityUrl, options);
            }),
            map(json => {
                return {
                    count: parseInt(json['odata.count'], 10),
                    value: json.value
                } as QueryResult<T>;
            }));
    }

    create(entity: T): Observable<boolean> {
        const entityUrl = `${this.apiUrl}/${this.entityName}`;
        return this.account.tokenProvider.getAuthorizationHeaders().pipe(
            mergeMap(headers =>  {
                const options = {
                    headers: this.getRequestHeaders(headers)
                };
                console.log(`querying ${entityUrl}`);
                return this.http.post(entityUrl, entity, options);
            }),
            map(() => {
                return true;
            }));
    }

    delete(entity: T): Observable<boolean> {
        const entityUrl = `${this.apiUrl}/${this.entityName}(${entity.Id})`;
        return this.account.tokenProvider.getAuthorizationHeaders().pipe(
            mergeMap(headers =>  {
                const options = {
                    headers: this.getRequestHeaders(headers)
                };
                console.log(`querying ${entityUrl}`);
                return this.http.delete(entityUrl, options);
            }),
            map(() => {
                return true;
            }));
    }

    update(entity: T): Observable<boolean> {
        const entityUrl = `${this.apiUrl}/${this.entityName}(${entity.Id})`;
        return this.account.tokenProvider.getAuthorizationHeaders().pipe(
            mergeMap(headers =>  {
                const options = this.getRequestHeaders(headers);
                console.log(`querying ${entityUrl}`);
                return this.http.put(entityUrl, options);
            }),
            map(() => {
                return true;
            }));
    }

    executeOperation(entity: T, operation: string, operationParams?: any): Observable<any> {
        const entityUrl = `${this.apiUrl}/${this.entityName}(${entity.Id})/${operation}`;
        return this.account.tokenProvider.getAuthorizationHeaders().pipe(
            mergeMap(headers =>  {
                const options = {
                    headers: this.getRequestHeaders(headers)
                };
                console.log(`querying ${entityUrl}`);
                return this.http.post<any>(entityUrl, operationParams, options);
            }));
    }

    private buildSearch(query: MediaQuery): HttpParams {
        const params = new HttpParams()
            .set('$inlinecount', 'allpages')
            .set('$top', query.top.toString())
            .set('$skip', query.skip.toString())
            .set('$filter', query.query.toString());
        return params;
    }
}
