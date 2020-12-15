import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService
      .validateIsAuthenticated()
      .then(() => {
        return true;
      })
      .catch(() => {
        this.router.navigate(['']);
        return false;
      });
  }
}
