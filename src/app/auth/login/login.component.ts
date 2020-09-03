import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) { }

  // creating reactive form
  loginForm = this.fb.group({
    emp_id: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  // variables
  userLogIn = {
    emp_id: null,
    password: null
  };

  submitted: boolean;
  errMsg: string = null;

  Ids: string[];
  filteredIds: Observable<string[]>;

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    this.submitted = false;

    // getting array of emp_ids in data base
    this.authService.getIds().subscribe(data => {
      this.Ids = data;

      this.filteredIds = this.loginForm.get('emp_id').valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value.toString()))
      );
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.Ids.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  onSubmit() {

    this.submitted = true;

    // submitting user
    this.authService.login(this.loginForm.value)
      .subscribe(data => {

        data = data['body']['user'];
        console.log(data);

        // setting user
        try {
          this.authService.setUser(data);
        } catch (err) {
          console.log(`setting up user failed (login.c.ts) with error : ${err}`)
        }

        //redirecting now 
        this.reRoute(data.level);
      },
        err => {
          this.errMsg = err.statusText;;
        });
  }

  reRoute(access: string) {
    if (access == 'emp' || access == 'mgt') {
      this.router.navigate(['empDash']);
    } else if (access == 'grd') {
      this.router.navigate(['guardDash']);
    } else {
      console.log("unknown access");
      this.router.navigate(['auth/signup']);
    }
  }

}
