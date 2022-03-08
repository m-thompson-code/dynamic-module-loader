import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, RouterStateSnapshot, Routes, UrlMatcher, UrlMatchResult, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { mapTo, Observable, of, Subject, tap } from 'rxjs';
import { CanActivateService } from '../can-activate-guard/can-activate-guard.service';
import { ConfigService } from '../config/config.service';
import { FeatureFlagFactory } from './feature-flag.model';

export type GetFeatureFlag = () => boolean;

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService implements FeatureFlagFactory {
  unsubscribe = new Subject<void>();
  constructor(private readonly configService: ConfigService) {
  }

  getFeatureRoutes(): Routes {
    return [
      {
        matcher: this.getUrlMatcher(this.getFeatureAUrlMatcher, () => {
          console.log(this.configService, this.configService.config);
          return this.configService.config === 'on'}
        ),
        loadChildren: () => import('../../routes/ab-routes/a-feature-flag/a-feature/a-feature.module').then(m => m.AFeatureModule),
      },
    ];
  }

  getUrlMatcher(urlMatcher: UrlMatcher, getFeatureFlag: GetFeatureFlag): UrlMatcher {
    return (segments: UrlSegment[], group: UrlSegmentGroup, route: Route) => {
      console.log('getUrlMatcher', segments, this, getFeatureFlag);
      segments.forEach(segment => console.log(segment));

      if (!getFeatureFlag()) {
        return null;
      }

      return urlMatcher(segments, group, route);
    };
  }

  getFeatureAUrlMatcher(segments: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult | null {
    return {
      consumed: segments,
    };
  }
}
