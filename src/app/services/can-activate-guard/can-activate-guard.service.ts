import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, RouterStateSnapshot, UrlTree } from '@angular/router';
import { mapTo, Observable, tap } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate, CanLoad, CanActivateChild {
  constructor(private readonly configService: ConfigService) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    console.log('canActivateChild start');
    return this.configService.config$.pipe(mapTo(true), tap(x => console.log('canActivateChild', x)));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    console.log('canActivate start');
    return this.configService.config$.pipe(mapTo(true), tap(x => console.log('canActivate', x)));
  }

  canLoad() {
    console.log('canLoad start');
    return this.configService.config$.pipe(mapTo(true), tap(x => console.log('canLoad', x)));
  }
}