import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.scss']
})
export class BComponent {

  constructor(private configService: ConfigService, private router: Router) {
    console.log(router.config);
  }
}
