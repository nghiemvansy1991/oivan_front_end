import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectListComponent, RemoveProjectDialog } from './project-list/project-list.component';
import { TechnologyListComponent, RemoveTechnologyDialog } from './technology-list/technology-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CreateProjectComponent } from './create-project/create-project.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CreateTechnologyComponent } from './create-technology/create-technology.component';
import { DeveloperListComponent, RemoveDeveloperDialog } from './developer-list/developer-list.component';
import { EditDeveloperComponent } from './edit-developer/edit-developer.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    PageNotFoundComponent,
    CreateProjectComponent,
    RemoveProjectDialog,
    CreateTechnologyComponent,
    TechnologyListComponent,
    RemoveTechnologyDialog,
    DeveloperListComponent,
    RemoveDeveloperDialog,
    EditDeveloperComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
