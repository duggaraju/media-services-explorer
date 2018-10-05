import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { AdalService } from './aad/adal.service';

@Injectable()
export class EnsureAuthenticatedGuard implements CanActivate {

    constructor(private router: Router, private adalService: AdalService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const navigationExtras: NavigationExtras = {
            queryParams: { 'redirectUrl': route.url }
        };

        const user = this.adalService.getCachedUser();
        if (!user) {
            this.router.navigate(['login'], navigationExtras);
        }

        const resource = 'https://rest.media.azure.net';
        const token = this.adalService.getCachedToken(resource);
        console.log(`cached token is ${token}`);
        if (!token) {
            this.adalService.acquireTokenInteractive('https://rest.media.azure.net');
        }
        return true;
    }
}
