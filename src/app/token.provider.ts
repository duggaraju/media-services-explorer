import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TokenProvider {

    getAuthorizationHeaders(): Observable<HttpHeaders>;
}
