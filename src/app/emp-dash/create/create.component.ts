import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { EntrysService } from '../../services/entrys.service'
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { userModel } from 'src/app/models/models';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  constructor(private router: Router,
    private authService: AuthService,
    private entryService: EntrysService) { }

  // variables
  entry = {
    name: null,
    emp_id: null,
    visit_date: "2020-01-01"
  };

  user: userModel = null;

  submitted: boolean = false;
  errMsg: string = null;
  message: string = null;


  ngOnInit(): void {
    this.submitted = false

    // getting back user
    try {
      this.user = this.authService.getUser();
    } catch (err) {
      console.log(`getting up user failed (create.c.ts) with error : ${err}`)
      this.errMsg = "some error occured while retriving user";
    }

    // re-routing if invalid
    if (!this.user) {
      this.goBack();
    }
  }

  onLoad() {
    // setting emp_id value
    (<HTMLInputElement>document.getElementById("emp_id")).value = this.user.emp_id.toString();
    this.entry.emp_id = this.user.emp_id;
  }

  onSubmit(form: NgForm) {

    this.submitted = true;

    // submitting entry
    this.entryService.createEntry(this.entry)
      .subscribe(data => {
        this.message = "Entry has been sucessfully submitted"
      },
        err => {
          this.errMsg = err.statusText;
        });
  }

  reset() {
    window.location.reload();
  }

  goBack() {
    this.router.navigate(['empDash']);
  }

}
