import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.scss']
})
export class AComponent implements OnInit {

  constructor(private router: Router, private configService: ConfigService) { }

  ngOnInit(): void {
  }

  canDeactivate(): boolean {
  // const routes = [
  //   {
  //     path: 'test/a/:id',
  //     loadChildren: () => this.configService.getFeatureModule(),
  //   },
  //   ...this.router.config
  // ];

  // this.router.resetConfig(routes);
  
  return true;
  }
}
