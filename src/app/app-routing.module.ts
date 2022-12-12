import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashformComponent } from './dashform/dashform.component';
import { DashsellerComponent } from './dashseller/dashseller.component';
import { DescriptionOfferComponent } from './description-offer/description-offer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'homePage',component: HomePageComponent},
  {path:'description',component: DescriptionOfferComponent},
  {path:'register',component: RegisterComponent},
  {path:'dashseller',component: DashsellerComponent},
  {path:'dashform',component: DashformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
export const routingComponents = [ HomePageComponent , DescriptionOfferComponent, RegisterComponent,DashsellerComponent, DashformComponent]
