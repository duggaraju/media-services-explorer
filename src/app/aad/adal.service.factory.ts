import { Injectable } from '@angular/core';
import { AdalService } from './adal.service';

@Injectable()
export class AdalServiceFactory {

    public constructor() {
    }

    public createAdalService(username: string) {
        let service =  new AdalService();
        service.init(username);
        return service;
    }
}