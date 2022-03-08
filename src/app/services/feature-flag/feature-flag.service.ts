import { Injectable } from '@angular/core';
import { Route, Routes, UrlMatcher, UrlMatchResult, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { FeatureFlag, FeatureFlagFactory } from './feature-flag.model';

export type GetFeatureFlag = () => boolean;

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService implements FeatureFlagFactory {
  constructor(private readonly configService: ConfigService) {
  }

  getFeatureRoutes(): Routes {
    return [
      {
        matcher: this.getUrlMatcher(this.getFeatureAUrlMatcher, () => this.configService.config === FeatureFlag.ON),
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
