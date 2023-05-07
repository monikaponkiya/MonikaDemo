import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/utils/alert.service';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [DatePipe]
})
export class EditUserComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<void>();
  options: any[] = [{ type: 'admin', name: 'Admin' },
  { type: 'user', name: 'User' },
  ];
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    birthday: new FormControl(''),
    userType: new FormControl('')
  });
  public acceptFileTypes: string = [
    '.png',
    '.jpeg'
  ].join(',');

  public fileToUpload: File | undefined | null = null;
  submitted = false;
  User!: User;
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _alertService: AlertService,
    private _router: Router,
    private _route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    debugger
    const userId = this._route.snapshot.paramMap.get('id');
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        gender: ['', Validators.required],
        birthday: ['', Validators.required],
        userType: [null, Validators.required]
      }
    );
    this._userService.getUser(parseInt(userId || ''))
      .pipe(takeUntil(this._unsubscribe))
      .subscribe({
        next: (res) => {
          debugger
          const userType = this.options.find(option => option.type === res.type);
          //this.form.controls['userType'].setValue(userType);
          this.form.setValue({
            name: res.name,
            email: res.email,
            gender: res.gender,
            birthday: this.datePipe.transform(res.birthday, "yyyy-MM-dd"),
            userType: userType
          });
        },
        error: (e) => {
          console.error(e)
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  onFileChanged(event: Event) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.fileToUpload = target.files?.item(0);
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
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      type: this.form.value.userType,
      gender: this.form.value.gender,
      birthday: this.form.value.birthday,
      profilePhoto: this.fileToUpload
    };
    this._userService.update(this._route.snapshot.paramMap.get('id'), payload)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe({
        next: () => {
          this.submitted = true;
          this._alertService.success('Sucessfully update user!!');
          this._router.navigate(['../user']);
        },
        error: (e) => {
          this._alertService.error(e.error.message);
        }
      });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
