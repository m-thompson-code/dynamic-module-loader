import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, merge, Observable, shareReplay, Subject, tap } from 'rxjs';
import { FeatureFlag } from '../config/config.model';
import { DemoRoute } from './config.model';

@Injectable({ providedIn: 'root'})
export class ConfigService {
  /**
   * @deprecated - Legacy code for developing FeatureFlagRouterModule
   */
  overrideA$ = new Subject<FeatureFlag>();
  /**
   * @deprecated - Legacy code for developing FeatureFlagRouterModule
   */
  configA: FeatureFlag = FeatureFlag.OFF;
  /**
   * @deprecated - Legacy code for developing FeatureFlagRouterModule
   */
  configA$: Observable<FeatureFlag> = this.getConfigA();

  overrideG$ = new Subject<FeatureFlag>();
  
  configG$: Observable<FeatureFlag> = this.getConfigG();

  constructor(private readonly httpClient: HttpClient) {
  }

  /**
   * @deprecated - Legacy code for developing FeatureFlagRouterModule
   */
  getConfigA(): Observable<FeatureFlag> {
    return merge(
      this.httpClient.get(`https://jsonplaceholder.typicode.com/todos/1?feature_flag=${DemoRoute.A}`).pipe(
        delay(3000),
        map(() => this.getMockConfigValue(DemoRoute.A)),
        shareReplay(1),
      ),
      this.overrideA$,
    ).pipe(tap(config => {
      this.configA = config;
    }))
  }

  getConfigG(): Observable<FeatureFlag> {
    return merge(
      this.httpClient.get(`https://jsonplaceholder.typicode.com/todos/1?feature_flag=${DemoRoute.G}`).pipe(
        delay(3000),
        map(() => this.getMockConfigValue(DemoRoute.G)),
        shareReplay(1),
      ),
      this.overrideG$,
    );
  }

  getLocalStorageKey(route: DemoRoute): string {
    return `feature-flag__${route}`;
  }

  setConfig(route: DemoRoute, featureFlag: FeatureFlag): void {
    localStorage.setItem(this.getLocalStorageKey(route), featureFlag || FeatureFlag.OFF);

    if (route === DemoRoute.A) {
      this.configA = featureFlag;
      this.overrideA$.next(featureFlag);
    } else {
      this.overrideG$.next(featureFlag);
    }
  }

  getMockConfigValue(route: DemoRoute): FeatureFlag {
    const featureFlag = localStorage.getItem(this.getLocalStorageKey(route));
    
    if (featureFlag === FeatureFlag.ON) {
      return FeatureFlag.ON;
    }

    return FeatureFlag.OFF;
  }
}
