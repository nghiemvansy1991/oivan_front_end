import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component'
import { CreateProjectComponent } from './create-project/create-project.component'
import { TechnologyListComponent } from './technology-list/technology-list.component'
import { CreateTechnologyComponent } from './create-technology/create-technology.component'
import { DeveloperListComponent } from './developer-list/developer-list.component'
import { EditDeveloperComponent } from './edit-developer/edit-developer.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

const routes: Routes = [
  { path: '', component: ProjectListComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/create', component: CreateProjectComponent },
  { path: 'projects/:id/update', component: CreateProjectComponent },
  { path: 'projects/:id/technologies', component: TechnologyListComponent },
  { path: 'technologies', component: TechnologyListComponent },
  { path: 'technologies/create', component: CreateTechnologyComponent },
  { path: 'technologies/:id/update', component: CreateTechnologyComponent },
  { path: 'projects/:project-id/developers', component: DeveloperListComponent },
  { path: 'projects/:project-id/developers/:id/update', component: EditDeveloperComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
