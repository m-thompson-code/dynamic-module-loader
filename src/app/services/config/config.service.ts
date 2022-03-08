import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { delay, filter, map, merge, Observable, shareReplay, Subject, takeUntil } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class ConfigService implements OnDestroy {
  override$ = new Subject<string>();
  config$ = this.getConfig();
  config: string = 'off';
  unsubscribe$ = new Subject<void>();

  constructor(private readonly httpClient: HttpClient) {
    this.config$.pipe(takeUntil(this.unsubscribe$)).subscribe(config => this.config = config);
  }

  getConfig(): Observable<string> {
    console.log('getConfig');
    return merge(
      this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1').pipe(
        delay(3000),
        map(() => this.getMockConfigValue()),
        shareReplay(1),
      ),
      this.override$.pipe(
        filter((override): override is string => !!override),
      )
    );
  }

  setConfig(): void {
    const mockValue = this.getMockConfigValue();
    console.log('setConfig', mockValue);

    this.override$.next(mockValue);
  }

  getMockConfigValue(): string {
    const featureFlag = localStorage.getItem('featureFlag');
    console.log("getMockConfigValue", featureFlag);
    return featureFlag ?? 'off';
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
