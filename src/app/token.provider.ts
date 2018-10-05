import { Headers } from '@angular/http';
import { Observable } from 'rxjs';

export interface TokenProvider {

    getAuthorizationHeaders(): Observable<Headers>;
}
