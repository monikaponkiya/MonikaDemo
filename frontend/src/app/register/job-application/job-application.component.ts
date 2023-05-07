import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/utils/guards/auth.service';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css']
})
export class JobApplicationComponent implements OnInit, OnDestroy{
  private _unsubscribe = new Subject<void>();

  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  jobform: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    contactNumber: new FormControl('')
  });

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.jobform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      contactNumber: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.jobform.controls;
  }

  onSubmit() {
    debugger
    if (this.jobform.valid) {
      const formData = this.jobform.value;
      this.formSubmit.emit(formData);
    }
  }
}
