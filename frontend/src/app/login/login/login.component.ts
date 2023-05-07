import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/utils/alert.service';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/utils/guards/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<void>();

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _alertService: AlertService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
      },
    );
  }
  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const payload = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this._userService.login(payload)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe({
        next: (user: User) => {
          if (user) {
            this.submitted = true;
            this._alertService.success('Sucessfully Login!!');
            this.authService.login(user);
            this._router.navigate(['../home']);
          }
          else {
            this._alertService.error('Login failed!!');
          }
        },
        error: () => {
          this._alertService.error('Login failed!!');
        }
      });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
