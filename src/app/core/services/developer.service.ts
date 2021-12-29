import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IDeveloperRequest } from 'src/app/core/interfaces/developer-request'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  private projectUrl = `${environment.apiUrl}/projects`

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  public getDeveloperListBelongToProject(projectId: string) {
    return this.http.get<IDeveloperRequest>(`${this.projectUrl}/${projectId}/developers`);
  }

  public getDeveloperBelongToProject(projectId: string, developerId: string) {
    return this.http.get<IDeveloperRequest>(`${this.projectUrl}/${projectId}/developers/${developerId}`);
  }

  public updateDeveloper(projectId: string, developerId: string, developerData: IDeveloperRequest) {
    return this.http.patch<IDeveloperRequest>(`${this.projectUrl}/${projectId}/developers/${developerId}`, developerData)
      .pipe(
        catchError((response) => this.handleError(response))
      );
  }

  public deleteDeveloper(projectId: string, developerId: string) {
    return this.http.delete(`${this.projectUrl}/${projectId}/developers/${developerId}`)
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
