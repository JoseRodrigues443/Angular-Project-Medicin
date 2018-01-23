import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class DoctorGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }
    canActivate() {
        if (this.authenticationService.userInfo)
            if (this.authenticationService.userInfo.userRoles[0] == 'doctor')
                return true;
        this.router.navigate(['/login', { u: 'no' }]);
        return false;
    }
}