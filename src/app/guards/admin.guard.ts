import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const adminGuard: CanActivateFn = () => {
    const loginService = inject(LoginService);
    const router = inject(Router);

    const user = loginService.getCurrentUser();
    if (user && user.admin) {
        return true;
    }

    router.navigate(['/home']);
    return false;
};
