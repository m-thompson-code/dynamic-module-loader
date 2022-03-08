import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, merge, Observable, shareReplay, Subject, tap } from 'rxjs';
import { FeatureFlag } from '../config/config.model';
import { DemoRoute } from './config.model';

@Injectable({ providedIn: 'root'})
export class ConfigService {
  override$ = new Subject<FeatureFlag>();
  configA$: Observable<FeatureFlag> = this.getConfig(DemoRoute.A);
  configG$: Observable<FeatureFlag> = this.getConfig(DemoRoute.G);
  configA: FeatureFlag = FeatureFlag.OFF;

  constructor(private readonly httpClient: HttpClient) {
  }

  getConfig(route: DemoRoute): Observable<FeatureFlag> {
    return merge(
      this.httpClient.get(`https://jsonplaceholder.typicode.com/todos/1?feature_flag=${route}`).pipe(
        delay(3000),
        map(() => this.getMockConfigValue(route)),
        shareReplay(1),
      ),
      this.override$,
    ).pipe(tap(config => {
      if (route === DemoRoute.A) {
        this.configA = config;
      }
    }))
  }

  getLocalStorageKey(route: DemoRoute): string {
    return `feature-flag__${route}`;
  }

  setConfig(route: DemoRoute, featureFlag: FeatureFlag): void {
    localStorage.setItem(this.getLocalStorageKey(route), featureFlag || FeatureFlag.OFF);

    if (route === DemoRoute.A) {
      this.configA = featureFlag;
    }

    this.override$.next(featureFlag);
  }

  getMockConfigValue(route: DemoRoute): FeatureFlag {
    const featureFlag = localStorage.getItem(this.getLocalStorageKey(route));
    
    if (featureFlag === FeatureFlag.ON) {
      return FeatureFlag.ON;
    }

    return FeatureFlag.OFF;
  }
}
