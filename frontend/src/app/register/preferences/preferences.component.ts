import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/utils/guards/auth.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit, OnDestroy{
  private _unsubscribe = new Subject<void>();

  options: any[] = [
    { type: 'on-site', name: 'On Site' },
    { type: 'wfh', name: 'Work From Home' },
    { type: 'hybrid', name: 'Hybrid' },
  ];

  preferenceform: FormGroup = new FormGroup({
    location: new FormControl(''),
    expectedCTC: new FormControl(''),
    currentCTC: new FormControl(''),
    noticePeriod: new FormControl('')
  });

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.preferenceform = this.formBuilder.group({
      location: [null, Validators.required],
      expectedCTC: ['', [Validators.required, Validators.email]],
      currentCTC: ['', Validators.required],
      noticePeriod: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.preferenceform.controls;
  }
}

