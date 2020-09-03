import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { entryModel, userModel } from 'src/app/models/models';
import { EntrysService } from 'src/app/services/entrys.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private router: Router,
    private entryService: EntrysService,
    private authService: AuthService
  ) { }

  // variables
  entry = {
    name: "Abc Xyz",
    emp_id: 1234,
    visit_date: "2020-07-26",
    active: false
  };
  entry_num;

  submitted: boolean = false;
  errMsg: string = null;
  message: string = null;

  ngOnInit(): void {
    this.entry_num = parseInt(this.route.snapshot.paramMap.get("entry_num"));
    console.warn(`the current entry number is : ${this.entry_num}`);

    this.submitted = false

    // getting back user
    try {
      var entry = this.authService.getUser().entrys[this.entry_num];
      this.entry.name = entry.name;
      this.entry.emp_id = entry.emp_id;
      this.entry.visit_date = entry.visit_date;
      this.entry.active = entry.active;

    } catch (err) {
      console.log(`getting up user failed (create.c.ts) with error : ${err}`)
      this.errMsg = "some error occured while retriving user";
    }

    // re-routing if invalid
    if (!this.entry) {
      this.goBack();
    }
  }

  onSubmit(form: NgForm) {

    this.submitted = true;
    console.log(this.entry);

    // submitting entry
    this.entryService.editEntry(this.entry, this.entry_num)
      .subscribe(data => {
        this.message = "Entry has been sucessfully edited"
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
