import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService,
    public router: Router) { }

  // variables
  user = {
    name: null,
    contact_info: null,
    emp_id: null,
    email: null,
    password: null,
  };

  submitted: boolean;
  errMsg: string = null;

  ngOnInit(): void {
    this.submitted = false;
  }

  // submitting the form
  onSubmit(form: NgForm) {

    this.submitted = true;

    // creating user
    this.userService.postUser(this.user)
      .subscribe(data => {
        console.log("sucess!");

        // redirecting to login if signup sucessful
        this.reRoute();
      },
        err => {
          this.errMsg = err.statusText;
        });
  }

  reRoute() {
    console.log("waiting...");
    this.router.navigate(['auth/login']);
  }
}
