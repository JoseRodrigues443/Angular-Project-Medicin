import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ProviderGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }
    canActivate() {
        if (this.authenticationService.userInfo)
            if (this.authenticationService.userInfo.userRoles[0] == 'provider')
                return true;
        this.router.navigate(['/login', { u: 'no' }]);
        return false;
    }
}