import { Injectable } from '@angular/core';
import { Route, Routes, UrlMatcher, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { defaultUrlMatcher } from '../../feature-flag-router/angular-utils/default-url-matcher';
import { ConfigService } from '../config/config.service';
import { FeatureFlag } from '../config/config.model';
import { FeatureFlagFactory } from './feature-flag.model';

export type GetFeatureFlag = () => boolean;

/**
 * @deprecated - Use FeatureFlagRouterModule instead
 */
@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService implements FeatureFlagFactory {
  constructor(private readonly configService: ConfigService) {
  }

  /**
   * Used specifically for handling Feature Flagging A
   * 
   * @returns Routes used to navigate to A FEATURE if feature flag is on
   */
  getFeatureRoutes(): Routes {
    return [
      {
        matcher: this.getUrlMatcher(),
        loadChildren: () => import('../../routes/ab-routes/a-feature-flag/a-feature/a-feature.module').then(m => m.AFeatureModule),
      },
    ];
  }

  getUrlMatcher(): UrlMatcher {
    return (segments: UrlSegment[], group: UrlSegmentGroup, route: Route) => {
      if (this.configService.configA !== FeatureFlag.ON) {
        return null;
      }

      return defaultUrlMatcher(segments, group, route);
    };
  }
}
