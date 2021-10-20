import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Student } from "../DTOs/student";


@Injectable({
  providedIn: 'root'
})
export class DidactisService {
  private baseUrl = 'https://localhost:44331/api/';
  private studentUrl = this.baseUrl + 'student';


  constructor(private http: HttpClient) {
    this.http = http;
  }

  //METODO PRENDI STUDENTI
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentUrl)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  //METODO PRENDI STUDENTE PER ID
  getStudentById(id: Number): Observable<Student> {
    return this.http.get<Student>(`${this.studentUrl}/${id}`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  //CREA STUDENTE
  createStudent(student: Student): Observable<Student> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post<Student>(this.studentUrl, student, { headers: hs })
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }


  //AGGIORNA STUDENTE
  updateStudent(student: Student): Observable<Student> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.put<Student>(this.studentUrl, student, { headers: hs })
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }

  //METODO ELIMINA STUDENTE
  deleteStudent(id: number): Observable<Student> {
    return this.http.delete<Student>(`${this.studentUrl}/${id}`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }

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
