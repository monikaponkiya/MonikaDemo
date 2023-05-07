import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import Validation from 'src/app/utils/validators';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/utils/alert.service';
import { AuthService } from 'src/app/utils/guards/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  private _unsubscribe = new Subject<void>();
  public currentStep: number = 1;
  submitted = false;
  formData: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _alertService: AlertService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  handleData(data: any) {
    debugger
    console.log(data); // Output the emitted data from the child component
  }

  onSubmit(): void {
    debugger;
    this.submitted = true;
    this.formData = { ...this.formData };
    // if (this.form.invalid) {
    //   return;
    // }
    // debugger
    // const payload = {
    //   name: this.form.value.name,
    //   email: this.form.value.email,
    //   contactNumber: this.form.value.password,
    //   gender: this.form.value.gender
    // };

    // this._userService.register(payload)
    //   .pipe(takeUntil(this._unsubscribe))
    //   .subscribe({
    //     next: () => {
    //       this.submitted = true;
    //       this._alertService.success('Register User Sucessfully!!');
    //       if (this.authService.isAdminLoggedIn$) {
    //         this._router.navigate(['../user']);
    //       } else {
    //         this._router.navigate(['../login']);
    //       }
    //     },
    //     error: (e) => console.error(e)
    //   });
  }
}
