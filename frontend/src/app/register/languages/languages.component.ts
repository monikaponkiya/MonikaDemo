import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/utils/guards/auth.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<void>();

  languageform: FormGroup = new FormGroup({
    languageName: new FormControl(''),
    read: new FormControl(false),
    write: new FormControl(false),
    speak: new FormControl(false)
  });

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.languageform = this.formBuilder.group({
      languageName: ['', Validators.required],
      read: [false, [Validators.required, Validators.email]],
      write: [false, Validators.required],
      speak: [false, Validators.required]
    })
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.languageform.controls;
  }
}

