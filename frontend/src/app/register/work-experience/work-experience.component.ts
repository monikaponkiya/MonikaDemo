import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/utils/guards/auth.service';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit, OnDestroy{
  private _unsubscribe = new Subject<void>();

  workExperienceform: FormGroup = new FormGroup({
    companyName: new FormControl(''),
    designation: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl('')
  });

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.workExperienceform = this.formBuilder.group({
      companyName: ['', Validators.required],
      designation: ['', [Validators.required, Validators.email]],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.workExperienceform.controls;
  }
}

