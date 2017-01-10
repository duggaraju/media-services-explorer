import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MediaAccount } from './mediaaccount';
import { MediaService } from './media.service';

@Injectable()
export class MediaServiceFactory {
    private services = new Map<string, MediaService>();

    constructor(private http:Http) {
    }

    public getMediaService(account: MediaAccount): MediaService {
        let hash = JSON.stringify(account);
        let service = this.services.get(hash);
        if (!service) {
            service = new MediaService(this.http, account);
            this.services.set(hash, service);
        }
        return service;
    }
}