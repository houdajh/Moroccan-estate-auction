import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescriptionOfferComponent } from './description-offer/description-offer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'homePage',component: HomePageComponent},
  {path:'description',component: DescriptionOfferComponent},
  {path:'register',component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
export const routingComponents = [ HomePageComponent , DescriptionOfferComponent, RegisterComponent]
