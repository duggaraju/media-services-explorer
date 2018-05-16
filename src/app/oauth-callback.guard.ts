import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdalService } from './aad/adal.service';

@Injectable()
export class OAuthCallbackGuard implements CanActivate {

    constructor(private router: Router, private adalService: AdalService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        this.adalService.handleWindowCallback();
        const user = this.adalService.getCachedUser();
        if (user) {
            const returnUrl = route.queryParams['returnUrl'];

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
