import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MediaAccount } from './mediaaccount';
import { MediaService } from './media.service';

@Injectable()
export class MediaServiceFactory {
    private services = new Map<string, MediaService>();

    constructor(private http: HttpClient) {
    }

    public getMediaService(account: MediaAccount): MediaService {
        const hash = JSON.stringify(account);
        let service = this.services.get(hash);
        if (!service) {
            service = new MediaService(this.http, account);
            this.services.set(hash, service);
        }
        return service;
    }
}
