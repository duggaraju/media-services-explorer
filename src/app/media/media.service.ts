
import { Injectable } from '@angular/core';
import { TokenProvider } from '../token.provider';
import { Http, Headers, RequestOptions, RequestMethod, Request, Response, URLSearchParams } from '@angular/http';
import { MediaAccount } from './mediaaccount';
import { Asset } from './asset';
import { Channel } from './channel';
import { Job } from './job';
import { ContentKey } from './contentkey';
import { Locator } from './locator';
import { AccessPolicy } from './accesspolicy';
import { DeliveryPolicy } from './deliverypolicy';
import { StreamingEndpoint } from './streamingendpoint';
import { Observable } from 'rxjs/Rx';
import { MediaQuery } from "./mediaquery";
import { QueryResult } from "./queryresult";
import { MediaEntity } from './media.entity';
import { MediaEntityService } from './media.entity.service';

@Injectable()
export class MediaService {
    private defaultHeaders: Headers;
    private apiUrl: string;
    
    public static readonly defaultVersion:string = "2.14";

    constructor(private http: Http, private account: MediaAccount) {
        this.defaultHeaders = new Headers( {
            "Accept": "application/json",
            "x-ms-version": account.apiVersion || MediaService.defaultVersion
        });
    }

    private getRequestOptions(headers: Headers): RequestOptions {
        let options = new RequestOptions( { headers: this.defaultHeaders });
        headers.forEach( (values: string[], name) => options.headers.set(name, values));
        return options;
    }

    public getApiUrl(): Observable<string> {
        if (!this.apiUrl) {
            console.log(`Checking ${this.account.apiUrl} to see if redirection is needed `);
            return this.account.tokenProvider.getAuthorizationHeaders()
                .flatMap((headers: Headers) => this.http.get(this.account.apiUrl, this.getRequestOptions(headers)))
                .map( (response: Response) =>  {
                    let  metadata = response.json();
                    this.apiUrl = metadata["odata.metadata"].replace(/\/\$metadata$/, "");
                    return this.apiUrl;
                });
        }
        return Observable.of(this.apiUrl);
    }

    /**
     * Gets the metadata for the rest endpoint.
     */
    getMetadata(): Observable<any> {
        return this.getApiUrl()
            .flatMap(url => this.account.tokenProvider.getAuthorizationHeaders()) 
            .flatMap(headers =>  this.http.get(`${this.apiUrl}/$metadata`, this.getRequestOptions(headers)))
            .map(response => response.json());
    }

    /**
     * Queries entities
     */
    getEntities<T>(entityName: string, query?:MediaQuery): Observable<QueryResult<T>> {
        let entityUrl: string; 
        return this.getApiUrl()
            .flatMap(url => {
                entityUrl = `${url}/${entityName}`;
                return this.account.tokenProvider.getAuthorizationHeaders()
            }).flatMap(headers =>  {
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

    private buildSearch(query: MediaQuery): URLSearchParams {
        var params = new URLSearchParams();
        params.set("$inlinecount", "allpages");
        params.set("$top", query.top.toString());
        params.set("$skip", query.skip.toString());
        params.set("$filter", query.query.toString());
        return params;
    }

    get channels(): Observable<MediaEntityService<Channel>> {
        return this.getEntityService("Channels");
    }

    public getEntityService<T extends MediaEntity>(entityName: string): Observable<MediaEntityService<T>> {
        return this.getApiUrl().map(apiUrl =>
            new MediaEntityService<T>(this.http, this.account, apiUrl, entityName));
    }
}