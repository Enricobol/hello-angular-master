import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DidactisService } from 'src/app/courses/didactis.service';
import { Course } from 'src/app/DTOs/course';
import { Teacher } from 'src/app/DTOs/teacher';

@Component({
  selector: 'app-edition-add',
  templateUrl: './edition-add.component.html',
  styleUrls: ['./edition-add.component.css']
})
export class EditionAddComponent implements OnInit {

  editionForm: FormGroup;
  teachers:Teacher[] = [];
  courses:Course[] = [];
  id:number = 0;

  constructor(private fb:FormBuilder, private courseService: DidactisService, private router:Router, private route:ActivatedRoute) {
    this.editionForm = this.fb.group({   
    });
  }

  //All'inizio
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.editionForm = this.fb.group({
      code: ['', Validators.required ],
      description: ['', Validators.required ],
      startDate: ['', Validators.required ],
      realPrice: ['', Validators.required ],
      instructorId: [0, Validators.required ],
      courseId: [this.id, Validators.required ]
    });
    this.courseService.getTeachers()
    .subscribe({
      next: t => {this.teachers = t; },
      error: error => console.log(error)
    });
    this.courseService.getCourses()
    .subscribe({
      next: t => {
        this.courses = t;
      },
      error: error => console.log(error)
    });
  }

  //Salvataggio
  save(){
    this.editionForm.value.docenteId = Number(this.editionForm.value.docenteId)
    this.editionForm.value.corsoId = Number(this.editionForm.value.corsoId)
    this.courseService.createEdition(this.editionForm.value)
        .subscribe({
          next: ce => {
            alert("Edizione creata con id: "+ce.id);
            this.router.navigate([`"/coursedetails/${this.editionForm.value.corsoId}"`]);
          },
          error: error=> console.log(error)
        });
    console.log(this.editionForm.value)
  }

  //Ritorna
  onBack(): void{
    this.router.navigate(["/coursedetails/"+this.id])
  }
  checkValid(name:string):boolean{
    let element = this.editionForm.get(name);
    if(!element)
    {
      return false;
    }

    return (element?.touched || element?.dirty) && !element?.valid
  }
  checkRequired(name:string):boolean{
    let element = this.editionForm.get(name);
    let required = element?.errors?.required;
    console.log(name);
    console.log(element?.errors);
    console.log(name+' required:'+required);
    return required;
  }
}
