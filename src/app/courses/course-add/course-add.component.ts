import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Area } from 'src/app/DTOs/area';
import { Level } from 'src/app/DTOs/level';
import { Course } from '../course';
import { DidactisService } from '../didactis.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

  course:Course = new Course();
  areas:Area[] = [];
  constructor(private service:DidactisService) { }

  ngOnInit(): void {
    this.service.getAreas()
                .subscribe({
                  next: as => this.areas = as,
                  error: err => console.log(err)
                })
  }

  getLevels() :{value : number, label:string}[] {
    let enumArray = Object.keys(Level)
                          .filter( x => !Number.isNaN(Number(x)))
                          .map( x => {
                            return { value: Number(x), label: Level[Number(x)] };
                          });
    console.log(enumArray);
    return enumArray;
  }
  save(form:NgForm){
    console.log(form.value);
    this.course.level = form.value
  }
}
