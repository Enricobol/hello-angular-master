import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseAddComponent } from './courses/course-add/course-add.component';
import { CourseDetailsListComponent } from './courses/course-deatails-list/course-details-list.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { EditionAddToListComponent } from './edition/edition-add-to-list/edition-add-to-list.component';
import { EditionAddComponent } from './edition/edition-add/edition-add.component';
import { EditionDetailsListComponent } from './edition/edition-details-list/edition-details-list.component';
import { EditionListComponent } from './edition/edition-list/edition-list.component';
import { HomeComponent } from './home/home.component';
import { StudentAddComponent } from './student/student-add/student-add.component';
import { StudentDetailsListComponent } from './student/student-deatails-list/student-details-list.component';
import { StudentListComponent } from './student/student-list/student-list.component';

const routes: Routes = [

  //LISTE
  { path: 'home', component: HomeComponent , data: { animationState: 'One' } },

  { path: 'courses', component: CourseListComponent, data: { animationState: 'Three' } },

  { path: 'students', component: StudentListComponent, data: { animationState: 'Two' } },

  { path: 'editions', component: EditionListComponent, data: { animationState: 'Four' } },

  //ADD COMPONENT
  { path: 'addstudents/:id', component: StudentAddComponent, data: { animationState: 'Add' } },

  { path: 'addcourse/:id', component: CourseAddComponent, data: { animationState: 'Add' } }, 
  
  { path: 'addedition/:id', component: EditionAddComponent, data: { animationState: 'ThreeDetailsAddEdition' }},
  
  { path: 'addeditiontolist/:id', component: EditionAddToListComponent, data: { animationState: 'ThreeDetailsAddEdition' }},
  
  //DETTAILS
  { path: 'coursedetails/:id', component: CourseDetailsListComponent, data: { animationState: 'ThreeDetails' }},

  { path: 'studentdetails/:id', component: StudentDetailsListComponent, data: { animationState: 'TwoDetails' }},
  
  { path: 'editiondetails/:id', component: EditionDetailsListComponent, data: { animationState: 'TwoDetails' }},
  
  //HOME
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
