import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DidactisService } from 'src/app/courses/didactis.service';
import { Course } from 'src/app/DTOs/course';
import { DetailsEdition } from 'src/app/DTOs/editionDetails';
import { Teacher } from 'src/app/DTOs/teacher';

@Component({
  selector: 'app-edition-add-to-list',
  templateUrl: './edition-add-to-list.component.html',
  styleUrls: ['./edition-add-to-list.component.css']
})
export class EditionAddToListComponent implements OnInit {

  editionForm: FormGroup;
  detailsEditions: DetailsEdition[] = [];
  detailsEdition: DetailsEdition = new DetailsEdition;
  teachers: Teacher[] = [];
  courses: Course[] = [];
  id: number = 0;

  constructor(private service: DidactisService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.editionForm = this.fb.group({
    });
  }

  //All'inizio
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.editionForm = this.fb.group({
      id: this.id,
      code: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      realPrice: ['', Validators.required],
      instructorId: [0, Validators.required],
      courseId: [this.id, Validators.required]
    });

    if (this.id != 0) { //Prendi edizione per id
      this.service.getEditionById(this.id)
        .subscribe({
          next: de => {
            this.detailsEdition = de;
            this.displayEdition();
            //console.log(this.course);
          },
          error: err => console.log(err)
        })
    }

    //Prendi la lista di Istruttori da mettere nella select
    this.service.getTeachers()
      .subscribe({
        next: t => { this.teachers = t; },
        error: error => console.log(error)
      });

    //Prendi la lista di Istruttori da mettere nei corsi
    this.service.getCourses()
      .subscribe({
        next: t => {
          this.courses = t;
        },
        error: error => console.log(error)
      });
  }

  displayEdition(): void {
    if (this.editionForm) {
      this.editionForm.reset();
      this.editionForm.patchValue({
        id : this.id,
        code: this.detailsEdition.code,
        description: this.detailsEdition.description,
        startDate: this.detailsEdition.startDate,
        realPrice: this.detailsEdition.realPrice,
        instructorId: this.detailsEdition.instructorId,
        courseId: this.detailsEdition.courseId,
      });
    }
  }

  //Salvataggio
  save() {
    this.editionForm.value.docenteId = Number(this.editionForm.value.docenteId)
    this.editionForm.value.corsoId = Number(this.editionForm.value.corsoId)

    if (this.id == 0) { //CREA EDIZIONE
      this.service.createEdition(this.editionForm.value)
        .subscribe({
          next: ce => {
            alert("Edizione creata con id: " + ce.id);
            this.router.navigate(["/editions"]);
          },
          error: error => console.log(error)
        });
      console.log(this.editionForm.value)
    }
    else { //AGGIORNA EDIZIONE
      console.log(this.editionForm.value)
      this.service.updateEdition(this.editionForm.value)
        .subscribe({
          next: de => {
            this.detailsEdition = de;
            
            alert("Corso aggiornato con id: " + this.detailsEdition.id);
            this.router.navigate(["/editions"])
          },
          error: err => console.log(err)
        });
    }
  }

  //Ritorna
  onBack(): void {
    this.router.navigate(["/editions"])
  }
  checkValid(name: string): boolean {
    let element = this.editionForm.get(name);
    if (!element) {
      return false;
    }

    return (element?.touched || element?.dirty) && !element?.valid
  }
  checkRequired(name: string): boolean {
    let element = this.editionForm.get(name);
    let required = element?.errors?.required;
    console.log(name);
    console.log(element?.errors);
    console.log(name + ' required:' + required);
    return required;
  }
}
