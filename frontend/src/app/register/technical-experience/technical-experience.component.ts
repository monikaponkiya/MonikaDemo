import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/utils/guards/auth.service';

@Component({
  selector: 'app-technical-experience',
  templateUrl: './technical-experience.component.html',
  styleUrls: ['./technical-experience.component.css']
})
export class TechnicalExperienceComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<void>();

  technicalform: FormGroup = new FormGroup({
    technologyName: new FormControl(''),
    biginner: new FormControl(false),
    mediator: new FormControl(false),
    expert: new FormControl(false)
  });

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.technicalform = this.formBuilder.group({
      technologyName: ['', Validators.required],
      biginner: [false, [Validators.required, Validators.email]],
      mediator: [false, Validators.required],
      expert: [false, Validators.required]
    })
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.technicalform.controls;
  }
}


