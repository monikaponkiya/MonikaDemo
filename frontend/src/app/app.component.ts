import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './utils/guards/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'front-end';

  constructor(
    public authService: AuthService,
    private _router: Router,
    ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this._router.navigate(['../login']);
  }

}
