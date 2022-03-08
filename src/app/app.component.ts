import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { DemoRoute, FeatureFlag } from './services/config/config.model';
import { ConfigService } from './services/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  readonly form: FormGroup;

  private readonly unsubscribe$ = new Subject<void>();

  readonly FeatureFlag = FeatureFlag;
  readonly DemoRoute = DemoRoute;

  // Inject ConfigService asap to start fetching api request asap
  constructor(private readonly configService: ConfigService, private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      id: [],
    });
  }

  setFeatureFlag(route: DemoRoute, value: FeatureFlag): void {
    this.configService.setConfig(route, value);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
