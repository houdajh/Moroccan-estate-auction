import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private registrationService: RegistrationService, private router : Router){};
  @ViewChild('myForm') form!: NgForm;
  @ViewChild('myDialog', { static: true }) dialog:any;
  @Input() userInfo: any;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
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

    console.log(this.form.value.userDetail);
    this.addedUser.firstName=this.form.value.userDetails.firstName;
    this.addedUser.lastName=this.form.value.userDetails.lastName;
    this.addedUser.email=this.form.value.userDetails.email;
    this.addedUser.password=this.form.value.userDetails.password;
    this.addedUser.adresse=this.form.value.userDetails.adresse;
    this.addedUser.phone=this.form.value.userDetails.phone;

    console.log(this.addedUser);
    this.saveUser(this.addedUser);
    //this.router.navigate(['/categoryManagement']);


  }

}
