import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { AadService } from './aad/aad.service';

@Injectable()
export class EnsureAuthenticatedGuard implements CanActivate {

    constructor(private router: Router, private aadService: AadService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const navigationExtras: NavigationExtras = {
            queryParams: { redirectUrl: route.url }
        };

        const user = this.aadService.getCachedUser();
        if (!user) {
            this.router.navigate(['login'], navigationExtras);
        }

        return true;
    }
}
