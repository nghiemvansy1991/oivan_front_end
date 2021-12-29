import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IProjectRequest } from 'src/app/core/interfaces/project-request'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectUrl = `${environment.apiUrl}/projects`

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  public getAllProjects() {
    return this.http.get<IProjectRequest>(this.projectUrl);
  }

  public getProjectById(projectId: string) {
    return this.http.get<IProjectRequest>(`${this.projectUrl}/${projectId}`);
  }

  public createProject(projectData: IProjectRequest) {
    return this.http.post<IProjectRequest>(this.projectUrl, projectData)
      .pipe(
        catchError((response) => this.handleError(response))
      );
  }

  public updateProject(projectId: string, projectData: IProjectRequest) {
    return this.http.patch<IProjectRequest>(`${this.projectUrl}/${projectId}`, projectData)
      .pipe(
        catchError((response) => this.handleError(response))
      );
  }

  public deleteProject(projectId: string) {
    return this.http.delete(`${this.projectUrl}/${projectId}`)
      .pipe(
        catchError((response) => this.handleError(response))
      );
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage = `${error.status}: ${error.error.error}`
    this.snackBar.open(errorMessage, 'Dismiss')
    return throwError(errorMessage);
  }
}
