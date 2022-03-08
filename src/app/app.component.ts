import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfigService } from './services/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'dynamic-module-loader';

  form: FormGroup;

  unsubscribe$ = new Subject<void>();

  // Inject ConfigService asap to start fetching api request asap
  constructor(private router: Router, private readonly configService: ConfigService) {
    this.form = new FormGroup({
      id: new FormControl(),
    });

    // this.configService.getConfig();
    // this.configService.featureModule$.subscribe(console.log);
  }
  ngOnInit(): void {
    // this.configService.getConfig();
  }

  setFeatureFlag(value: string): void {
    localStorage.setItem('featureFlag', value);
    this.configService.setConfig();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
