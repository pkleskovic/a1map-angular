import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn().then(response => {
      if (response) {
        console.log('no acting up');
        return true;
      } else {
        console.log('but this fucker acted up');
        this.router.navigate(['/login']);
        return false;
      }
    });
  }


}
