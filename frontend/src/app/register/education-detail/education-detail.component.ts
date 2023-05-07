import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/utils/guards/auth.service';

@Component({
  selector: 'app-education-detail',
  templateUrl: './education-detail.component.html',
  styleUrls: ['./education-detail.component.css']
})
export class EducationDetailComponent implements OnInit, OnDestroy{
  private _unsubscribe = new Subject<void>();

  eduform: FormGroup = new FormGroup({
    name: new FormControl(''),
    university: new FormControl(''),
    year: new FormControl(''),
    cgpa: new FormControl('')
  });

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.eduform = this.formBuilder.group({
      name: ['', Validators.required],
      university: ['', [Validators.required, Validators.email]],
      year: ['', Validators.required],
      cgpa: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.eduform.controls;
  }
}
