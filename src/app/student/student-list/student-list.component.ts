import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from 'src/app/DTOs/student';
import { DidactisService } from '../didactis.service';



@Component({
  selector: 'app-root',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})


export class StudentListComponent implements OnInit {

  public students:Student[] = [];
  public student:Student = new Student();

  constructor(private service:DidactisService, private router:Router, private route:ActivatedRoute) { console.log('courseListConstructor');
  }

  //All'inizializzazione
  ngOnInit(): void {
    console.log('ngOnInit StudentListComponent');
    let obsCourses:Observable<Student[]> = this.service.getStudents();
    obsCourses.subscribe({
      next: s => {
        this.students = s;
      },
      error: err => console.log(err)
    });
  }

  //Conferma Elimina Studente
  clickMethod(id: number) {
    if(window.confirm("Are you sure to delete "+id)) {
      console.log(this.remove(id));
    }
  }
  //Elimina
  remove(id: number){
    console.log(id)
    let obsCourse:Observable<Student> = this.service.deleteStudent(id);
    obsCourse.subscribe({
      next: s => {
        this.student = s;
        this.ngOnInit();
      },
      error: err => console.log(err)
    });
  }
}