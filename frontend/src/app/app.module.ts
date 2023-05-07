import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { RegistrationComponent } from './register/registration/registration.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HomeComponent } from './home/home/home.component';
import { EducationDetailComponent } from './register/education-detail/education-detail.component';
import { JobApplicationComponent } from './register/job-application/job-application.component';
import { LanguagesComponent } from './register/languages/languages.component';
import { PreferencesComponent } from './register/preferences/preferences.component';
import { TechnicalExperienceComponent } from './register/technical-experience/technical-experience.component';
import { WorkExperienceComponent } from './register/work-experience/work-experience.component';

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UsersListComponent,
    EditUserComponent,
    HomeComponent,
    EducationDetailComponent,
    JobApplicationComponent,
    WorkExperienceComponent,
    LanguagesComponent,
    TechnicalExperienceComponent,
    PreferencesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
