
import { Injectable } from '@angular/core';
import { AcsService } from './acs.service';
import { Http, Headers, Jsonp, RequestOptions, RequestMethod, Request, Response, URLSearchParams } from '@angular/http';
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
import {QueryResult} from "./queryresult";

@Injectable()
export class MediaService {
    private acsService: AcsService;
    private defaultHeaders: Headers;
    private apiUrl: string;
    
    public static readonly defaultVersion:string = "2.14";

    constructor(private http: Http, private jsonp:Jsonp, private account: MediaAccount) {
        this.acsService = new AcsService(http, jsonp, account);
        this.defaultHeaders = new Headers( {
            "Accept": "application/json",
            "x-ms-version": account.apiVersion || MediaService.defaultVersion
        });
    }

    getRequestOptions(headers: Headers, omitAccept?: boolean): RequestOptions {
        let options = new RequestOptions( { headers: this.defaultHeaders });
        headers.forEach( (values: string[], name) => options.headers.set(name, values));
        if(omitAccept) {
            options.headers.delete("Accept");
        }
        return options;
    }

    private getApiUrl(): Observable<string> {
        if (!this.apiUrl) {
            console.log(`Checking ${this.account.apiUrl} to see if redirection is needed `);
            return this.acsService.getAccessToken()
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
            .flatMap(url => this.acsService.getAccessToken()) 
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
                return this.acsService.getAccessToken()
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

    getStreamingEndpoints(query: MediaQuery): Observable<QueryResult<StreamingEndpoint>> {
        return this.getEntities<StreamingEndpoint>("StreamingEndpoints", query);
    }

    getChannels(query: MediaQuery): Observable<QueryResult<Channel>> {
        return this.getEntities<Channel>("Channels", query);
    }

    getAssets(query: MediaQuery): Observable<QueryResult<Asset>> {
        return this.getEntities<Asset>("Assets", query);
    }

    getJobs(query?: MediaQuery): Observable<QueryResult<Job>> {
        return this.getEntities<Job>("Jobs", query);
    }

    getLocators(query: MediaQuery): Observable<QueryResult<Locator>> {
        return this.getEntities<Locator>("Locators", query);
    }

    getAccessPolicies(query: MediaQuery): Observable<QueryResult<AccessPolicy>> {
        return this.getEntities<AccessPolicy>("AccessPolicies", query);
    }

    getDeliveryPolicies(query: MediaQuery): Observable<QueryResult<DeliveryPolicy>> {
        return this.getEntities<DeliveryPolicy>("AssetDeliveryPolicies", query);
    }

    getContentKeys(query: MediaQuery): Observable<QueryResult<ContentKey>> {
        return this.getEntities<ContentKey>("ContentKeys", query);
    }
}