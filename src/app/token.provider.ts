import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export interface TokenProvider {

    getAuthorizationHeaders(): Observable<Headers>;
}