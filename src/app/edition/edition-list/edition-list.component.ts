import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DidactisService } from 'src/app/courses/didactis.service';
import { DetailsEdition } from 'src/app/DTOs/editionDetails';

@Component({
  selector: 'app-edition-list',
  templateUrl: './edition-list.component.html',
  styleUrls: ['./edition-list.component.css']
})
export class EditionListComponent implements OnInit {

public detailsEditions : DetailsEdition[] = [];
public detailsEdition  : DetailsEdition = new DetailsEdition();

 
constructor(private service:DidactisService, private router:Router, private route:ActivatedRoute) { console.log('courseListConstructor');
}

//ALl'inizio
ngOnInit(): void {
  console.log('ngOnInit EditionListComponent');
  let obsEditions : Observable<DetailsEdition[]> = this.service.getEditions(); 
  obsEditions.subscribe({
    next: ce => {
      this.detailsEditions = ce;
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
  let obsEdition : Observable<DetailsEdition> = this.service.deleteEdition(id); 
  obsEdition.subscribe({
    next: ce => {
      this.detailsEdition = ce;
      this.ngOnInit();
    },
    error: err => console.log(err)
  });
 }
}
