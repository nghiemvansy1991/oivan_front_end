import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITechnologyRequest } from 'src/app/core/interfaces/technology-request';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  private technologyUrl = `${environment.apiUrl}/technologies`
  private projectUrl = `${environment.apiUrl}/projects`

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  public getAllTechnologies() {
    return this.http.get<ITechnologyRequest>(this.technologyUrl);
  }

  public getTechnologyById(technologyId: string) {
    return this.http.get<ITechnologyRequest>(`${this.technologyUrl}/${technologyId}`);
  }

  public getTechnologyByProjectId(projectId: string) {
    return this.http.get<ITechnologyRequest>(`${this.projectUrl}/${projectId}/technologies`);
  }

  public createTechnology(technologyData: ITechnologyRequest) {
    return this.http.post<ITechnologyRequest>(this.technologyUrl, technologyData)
      .pipe(
        catchError((response) => this.handleError(response))
      );
  }

  public updateTechnology(technologyId: string, technologyData: ITechnologyRequest) {
    return this.http.patch<ITechnologyRequest>(`${this.technologyUrl}/${technologyId}`, technologyData)
      .pipe(
        catchError((response) => this.handleError(response))
      );
  }

  public deleteTechnology(technologyId: string) {
    return this.http.delete(`${this.technologyUrl}/${technologyId}`)
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
