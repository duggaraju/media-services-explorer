
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { MediaAccount } from './mediaaccount';
import { Channel } from './channel';
import { Observable, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { MediaQuery } from './mediaquery';
import { QueryResult } from './queryresult';
import { MediaEntity } from './media.entity';
import { MediaEntityService } from './media.entity.service';

@Injectable()
export class MediaService {
    public static readonly defaultVersion: string = '2.14';

    private defaultHeaders: Map<string, string>;
    private apiUrl?: string;


    constructor(private http: HttpClient, private account: MediaAccount) {
        this.defaultHeaders = new Map([
            [ 'Accept', 'application/json' ],
            [ 'x-ms-version', account.apiVersion || MediaService.defaultVersion]
        ]);
    }

    private getRequestOptions(headers: HttpHeaders): HttpHeaders {
        this.defaultHeaders.forEach((value, name) => headers.set(name, value));
        return headers;
    }


    public getApiUrl(): Observable<string> {
        if (!this.apiUrl) {
            console.log(`Checking ${this.account.apiUrl} to see if redirection is needed `);
            return this.account.tokenProvider.getAuthorizationHeaders().pipe(
                mergeMap((headers: HttpHeaders) => this.http.get<any>(this.account.apiUrl, { headers: this.getRequestOptions(headers) })),
                map(json  =>  {
                    this.apiUrl = json['odata.metadata'].replace(/\/\$metadata$/, '');
                    return this.apiUrl as string;
                }));
        }
        return of(this.apiUrl);
    }

    /**
     * Gets the metadata for the rest endpoint.
     */
    getMetadata(): Observable<any> {
        return this.getApiUrl().pipe(
            mergeMap(() => this.account.tokenProvider.getAuthorizationHeaders()),
            mergeMap(headers =>  this.http.get<any>(`${this.apiUrl}/$metadata`, {
                headers: this.getRequestOptions(headers)
            })));
    }

    /**
     * Queries entities
     */
    getEntities<T>(entityName: string, query?: MediaQuery): Observable<QueryResult<T>> {
        let entityUrl: string;
        return this.getApiUrl().pipe(
            mergeMap(url => {
                entityUrl = `${url}/${entityName}`;
                return this.account.tokenProvider.getAuthorizationHeaders();
            }),
            mergeMap(headers => {
                const options = {
                    headers: this.getRequestOptions(headers),
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

    private buildSearch(query: MediaQuery): HttpParams {
        const params = new HttpParams()
            .set('$inlinecount', 'allpages')
            .set('$top', query.top.toString())
            .set('$skip', query.skip.toString())
            .set('$filter', query.query.toString());
        return params;
    }

    get channels(): Observable<MediaEntityService<Channel>> {
        return this.getEntityService('Channels');
    }

    public getEntityService<T extends MediaEntity>(entityName: string): Observable<MediaEntityService<T>> {
        return this.getApiUrl().pipe(
            map(apiUrl =>
            new MediaEntityService<T>(this.http, this.account, apiUrl, entityName)));
    }
}
