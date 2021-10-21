import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { CourseEdition } from 'src/app/DTOs/edition';
import { Area } from "../DTOs/area";
import { Course } from "../DTOs/course";
import { DetailsEdition } from "../DTOs/editionDetails";
import { Teacher } from "../DTOs/teacher";


@Injectable({
  providedIn: 'root'
})
export class DidactisService {
  private baseUrl = 'https://localhost:44331/api/';
  private courseUrl = this.baseUrl + 'course';
  private courseEditionUrl = this.baseUrl + 'courseEdition';
  private teacherUrl = this.baseUrl + 'instructor'
  //private http:HttpClient;
  constructor(private http: HttpClient) {
    this.http = http;
  }

  //METODO PRENDI CORSI
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseUrl)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  //METODO PRENDI CORSO PER ID
  getCourseById(id: Number): Observable<Course> {
    return this.http.get<Course>(`${this.courseUrl}/${id}`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  //PRENDI AREA
  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.courseUrl}/areas`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  //CREA CORSO
  createCourse(course: Course): Observable<Course> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post<Course>(this.courseUrl, course, { headers: hs })
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }

  //AGGIORNA CORSO
  updateCourse(course: Course): Observable<Course> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.put<Course>(this.courseUrl, course, { headers: hs })
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }

  //METODO ELIMINA CORSO
  deleteCourse(id: number): Observable<Course> {
    return this.http.delete<Course>(`${this.courseUrl}/${id}`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }

  //PRENDI EDIZIONE DAL ID CORSO 
  getEditionsByCourseId(id: number): Observable<CourseEdition[]> {
    return this.http.get<CourseEdition[]>(`${this.courseEditionUrl}/course/${id}`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  //PRENDI INSEGNANTE
  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.teacherUrl)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  //CREA EDIZIONE
  createEdition(edition: CourseEdition): Observable<CourseEdition> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post<CourseEdition>(this.courseEditionUrl, edition, { headers: hs })
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  //ELIMINA EDIZIONE
  deleteEdition(id: number): Observable<DetailsEdition> {
    return this.http.delete<DetailsEdition>(`${this.courseEditionUrl}/${id}`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }

  //METODO PRENDI EDIZIONI
  getEditions(): Observable<DetailsEdition[]> {
    return this.http.get<DetailsEdition[]>(this.courseEditionUrl)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  //METODO PRENDI EDIZONE PER ID
  getEditionById(id: Number): Observable<DetailsEdition> {
    return this.http.get<DetailsEdition>(`${this.courseEditionUrl}/${id}`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  //AGGIORNA EDIZIONE
  updateEdition(edition: DetailsEdition): Observable<DetailsEdition> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.put<DetailsEdition>(this.courseEditionUrl, edition, { headers: hs })
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }


  //Errore
  private handleError(errorResponse: HttpErrorResponse): Observable<never> { //lancia un'eccezione
    let errorMessage = '';
    if (errorResponse.error instanceof ErrorEvent) {
      errorMessage = 'errore di rete: ' + errorResponse.error.message;
    } else {
      errorMessage = 'errore lato server: ' + errorResponse.status + '' + errorResponse.message;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}


