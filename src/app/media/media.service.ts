
import { Injectable } from '@angular/core';
import { AcsService } from './acs.service';
import { Http, Headers, Jsonp, RequestOptions, RequestMethod, Request, Response } from '@angular/http';
import { MediaAccount } from './mediaaccount';
import { Asset } from './asset';
import { Channel } from './channel';
import { StreamingEndpoint } from './streamingendpoint';
import { Observable } from 'rxjs/RX';
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
        return Observable.from(this.apiUrl);
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
    getEntities<T>(entityName: string, query?:MediaQuery): Observable<T[]> {
        let entityUrl: string; 
        return this.getApiUrl()
            .flatMap(url => {
                entityUrl = `${url}/${entityName}`;
                return this.acsService.getAccessToken()
            }).flatMap(headers =>  {
                var options = this.getRequestOptions(headers);
                return this.http.get(entityUrl, options);
            }).map(response => response.json().value);
    }

    getStreamingEndpoints(): Observable<StreamingEndpoint[]> {
        return this.getEntities<StreamingEndpoint>("StreamingEndpoints");
    }

    getChannels(): Observable<Channel[]> {
        return this.getEntities<Channel>("Channels");
    }

    getAssets(): Observable<Asset[]> {
        return this.getEntities<Asset>("Assets");
    }
}