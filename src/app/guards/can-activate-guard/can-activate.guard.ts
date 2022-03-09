import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, RouterStateSnapshot, UrlTree } from '@angular/router';
import { mapTo, Observable, tap } from 'rxjs';
import { ConfigService } from '../../services/config/config.service';

/**
 * Guard to allow for config$ to load to determine if loading FEATURE A
 * 
 * @deprecated - Use FeatureFlagRouterModule instead
 */
@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(private readonly configService: ConfigService) {}

  /**
  * @deprecated - Use FeatureFlagRouterModule instead
  */
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    console.log('canActivateChild start');
    return this.configService.configA$.pipe(mapTo(true), tap(x => console.log('canActivateChild', x)));
  }

  /**
  * @deprecated - Use FeatureFlagRouterModule instead
  */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    console.log('canActivate start');
    return this.configService.configA$.pipe(mapTo(true), tap(x => console.log('canActivate', x)));
  }

  /**
  * @deprecated - Use FeatureFlagRouterModule instead
  */
  canLoad() {
    console.log('canLoad start');
    return this.configService.configA$.pipe(mapTo(true), tap(x => console.log('canLoad', x)));
  }
}