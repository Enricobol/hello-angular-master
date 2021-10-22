import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DidactisService } from 'src/app/courses/didactis.service';
import { DetailsEdition } from 'src/app/DTOs/editionDetails';

//declare bootbox : any;

@Component({
  selector: 'app-edition-details-list',
  templateUrl: './edition-details-list.component.html',
  styleUrls: ['./edition-details-list.component.css']
})
export class EditionDetailsListComponent implements OnInit {

  edition : DetailsEdition | undefined;

  constructor(private courseService: DidactisService, private router:Router, private route:ActivatedRoute){
  }

  //All'inizio
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id!=null)
    { //Prendi l'edizione per l'id passato
      this.courseService.getEditionById(id)
      .subscribe({
        next: e => {this.edition = e},
        error: error => console.log(error)
      });
    }
    
    let view = document.getElementById("view");
    view?.addEventListener

  }
  onBack(): void{
    this.router.navigate(["/editions"])
  } 
}