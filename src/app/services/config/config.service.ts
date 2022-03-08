import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, merge, Observable, shareReplay, Subject, tap } from 'rxjs';
import { FeatureFlag } from '../feature-flag/feature-flag.model';

@Injectable({ providedIn: 'root'})
export class ConfigService {
  override$ = new Subject<FeatureFlag>();
  config$: Observable<FeatureFlag> = this.getConfig();
  config: FeatureFlag = FeatureFlag.OFF;

  constructor(private readonly httpClient: HttpClient) {
  }

  getConfig(): Observable<FeatureFlag> {
    return merge(
      this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1').pipe(
        delay(3000),
        map(() => this.getMockConfigValue()),
        shareReplay(1),
      ),
      this.override$,
    ).pipe(tap(config => this.config = config))
  }

  setConfig(featureFlag: FeatureFlag): void {
    localStorage.setItem('featureFlag', featureFlag || FeatureFlag.OFF);

    this.override$.next(featureFlag);
  }

  getMockConfigValue(): FeatureFlag {
    const featureFlag = localStorage.getItem('featureFlag');
    
    if (featureFlag === FeatureFlag.ON) {
      return FeatureFlag.ON;
    }

    return FeatureFlag.OFF;
  }
}
