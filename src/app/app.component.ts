import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ConfigService } from './services/config/config.service';
import { FeatureFlag } from './services/feature-flag/feature-flag.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly form: FormGroup;

  private readonly unsubscribe$ = new Subject<void>();

  readonly FeatureFlag = FeatureFlag;

  // Inject ConfigService asap to start fetching api request asap
  constructor(private readonly configService: ConfigService) {
    this.form = new FormGroup({
      id: new FormControl(),
    });
  }
  ngOnInit(): void {
  }

  setFeatureFlag(value: FeatureFlag): void {
    this.configService.setConfig(value);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
