import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private userService: UserService) {}

  async isAuthenticated() {
    let isAuthenticated = false;
    await this.userService
      .validateIsAuthenticated()
      .then(() => {
        return true;
      })
      .catch(() => (isAuthenticated = false));
    return isAuthenticated;
  }
}
