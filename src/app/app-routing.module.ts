import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EducationComponent } from './component/education/education.component';
import { HomeComponent } from './component/home/home.component';


const routes: Routes = [
  /** home */
  {
    path: "home",
    redirectTo: "",
    pathMatch: "full"
  },
  {
    /**
     * La radice della single page application è stabilita al componente HomeComponent
     */
    path: "",
    component: HomeComponent,
  },
  /** education */
  {
    path: "education",
    component: EducationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
