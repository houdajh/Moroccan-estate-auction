import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Appuser } from '../model/appuser.model';
import { Login } from '../model/login.model';
import { User } from '../model/user.model';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public errors!: string [];
  private t: any;
  public addedUser : User = new User();
  public addedLogin : Login = new Login();
  parentSelector: boolean = false;
  public currentuser : Appuser = new Appuser();

  constructor(private registrationService: RegistrationService, private router : Router){};
  @ViewChild('myForm') form!: NgForm;
  @ViewChild('myForm2') form2!: NgForm;
  @ViewChild('myDialog', { static: true }) dialog:any;
  @Input() userInfo: any;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  async ngOnInit(){
    this.getCurrentUser();
  }

  options = [
    {id: '1', value: true , val:'Customer'},
    {id: '2', value: false , val:'Seller'},

  ]
    disableSelect = new FormControl(false);
    

    public getCurrentUser(): void {
      this.registrationService.getUser().subscribe(
        (response: Appuser) => {
          this.currentuser = response;
  
          console.log(this.currentuser);
  
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

  saveUser(user : User) {
    this.errors = [];
    this.registrationService.addUser(user)
      .subscribe(data => {
          var win_timer = setInterval(function() {

            window.location.reload();
            clearInterval(win_timer);
            
          }, 100); this.t;
        },
        error => {
          this.errors = error.error.errors;
        });
  }


  onSubmit(){
    this.addedUser.firstName=this.form.value.userDetails.firstName;
    this.addedUser.lastName=this.form.value.userDetails.lastName;
    this.addedUser.email=this.form.value.userDetails.email;
    this.addedUser.password=this.form.value.userDetails.password;
    this.addedUser.adresse=this.form.value.userDetails.adresse;
    this.addedUser.phone=this.form.value.userDetails.phone;

    console.log(this.addedUser);
    this.saveUser(this.addedUser);
    console.log(this.registrationService.addUser(this.addedUser));
    //this.router.navigate(['/categoryManagement']);

  }
  saveLogin(login : Login) {
    this.errors = [];
    this.registrationService.loginUser(login)
      .subscribe(data => {
          var win_timer = setInterval(function() {
            console.log(this.registrationService.loginUser(login));
            //window.location.reload();
            clearInterval(win_timer);
            
          }, 100); this.t;
        },
        error => {
          this.errors = error.error.errors;
        });
  }
  onSubmit2(){
    this.addedLogin.usernameOrEmail=this.form2.value.userDetails2.usernameOrEmail;
    this.addedLogin.password=this.form2.value.userDetails2.password;

    console.log(this.addedLogin);
    this.saveLogin(this.addedLogin);
    //this.router.navigate(['/homePage']);

  }

}
