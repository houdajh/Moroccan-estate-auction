import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Appuser } from '../model/appuser.model';
import { Login } from '../model/login.model';
import { Offre } from '../model/offre.model';
import { User } from '../model/user.model';
import { OffresService } from '../services/offres.service';
import { RegistrationService } from '../services/registration.service';
import { SharedServiceService } from '../services/shared-service.service';

@Component({
  selector: 'app-dashform',
  templateUrl: './dashform.component.html',
  styleUrls: ['./dashform.component.css']
})
export class DashformComponent implements OnInit {

  @ViewChild('myForm') form!: NgForm;
  @ViewChild('myDialog', { static: true }) dialog:any;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  public errors!: string [];
  private t: any;
  public addedUser : User = new User();
  public addedLogin : Login = new Login();
  public addedOffer : Offre = new Offre();
  parentSelector: boolean = false;
  public currentuser : Appuser = new Appuser();

  constructor(private registrationService: RegistrationService,private offerService: OffresService,
    private sharedService : SharedServiceService, private router : Router) { }

  async ngOnInit(){
    await this.getCurrentUser();
    
  }

  public async getCurrentUser(): Promise<void> {
    this.registrationService.getUser().subscribe(
     (response: Appuser) => {
       this.currentuser = response;
       console.log(this.currentuser.firstName);
       console.log(this.currentuser);
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
     }
   );
 }

 saveOffer(offer : Offre) {
  this.errors = [];
  this.offerService.addOffer(offer)
    .subscribe(data => {
        var win_timer = setInterval(function() {

          //window.location.reload();
          clearInterval(win_timer);
          
        }, 100); this.t;
      },
      error => {
        this.errors = error.error.errors;
      });
}

onSubmit(){
  this.addedOffer.title=this.form.value.offerDetails.title;
  this.addedOffer.address=this.form.value.offerDetails.address;
  this.addedOffer.debutAuction=this.form.value.offerDetails.debutAuction;
  this.addedOffer.initialprice=this.form.value.offerDetails.initialprice;
  this.addedOffer.duration=this.form.value.offerDetails.duration;
  this.addedOffer.description=this.form.value.offerDetails.description;

  console.log(this.addedOffer);
  console.log(this.form.value.offerDetails.description);
  this.saveOffer(this.addedOffer);
  //alert("votre compte est bien enregistré");

 //window.location.reload();

}

}
