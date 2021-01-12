import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AadService } from './aad/aad.service';

@Injectable()
export class OAuthCallbackGuard implements CanActivate {

    constructor(private router: Router, private aadService: AadService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        this.aadService.handleWindowCallback();
        const user = this.aadService.getCachedUser();
        if (user) {
            const returnUrl = route.queryParams.returnUrl;

            if (!returnUrl) {
                this.router.navigate(['accounts']);
            } else {
                this.router.navigate([returnUrl], { queryParams: route.queryParams });
            }
        } else {
            this.router.navigate(['login']);
        }

        return false;
    }
}
