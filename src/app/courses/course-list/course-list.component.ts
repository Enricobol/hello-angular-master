import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/DTOs/course';
import { DidactisService } from '../didactis.service';



@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})

export class CourseListComponent implements OnInit {

  public courses:Course[] = [];
  public course:Course = new Course();

  constructor(private service:DidactisService, private router:Router, private route:ActivatedRoute) { console.log('courseListConstructor');
  }


  ngOnInit(): void {
    console.log('ngOnInit CourseListComponent');
    let obsCourses:Observable<Course[]> = this.service.getCourses();
    obsCourses.subscribe({
      next: cs => {
        this.courses = cs;
      },
      error: err => console.log(err)
    });
  }

  clickMethod(id: number) {
    if(window.confirm("Are you sure to delete "+id)) {
      console.log(this.remove(id));
    }
  }

  remove(id: number){
    console.log(id)
    let obsCourse:Observable<Course> = this.service.deleteCourse(id);
    obsCourse.subscribe({
      next: c => {
        this.course = c;
        this.ngOnInit();
      },
      error: err => console.log(err)
    });
  }
}
