import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { userModel, entryModel } from '../models/models'
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-dash',
  templateUrl: './emp-dash.component.html',
  styleUrls: ['./emp-dash.component.css']
})
export class EmpDashComponent implements OnInit {
  constructor(private authService: AuthService,
    private router: Router) {
    // window.location.reload();
  }

  // variables
  user: userModel = null;
  entrys: Array<entryModel> = null;
  errUser: string = null;

  ngOnInit(): void {

    // reloading once
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('foo');
    }

    // getting back user
    try {
      this.authService.updateUser()
        .subscribe(
          data => {
            this.user = data.body;
            this.entrys = this.user.entrys.reverse();
          }
        );
    } catch (err) {
      console.log(`getting up user failed (emp-dash.c.ts) with error : ${err}`)
      this.errUser = "some error occured while retriving user";
    }

    // re-routing if invalid
    setTimeout(() => {
      this.reRoute();
    },
      5000);
  }

  onEdit(index: number) {
    var index = this.entrys.length - 1 - index;
    console.log(`edit password index = ${index}`);
    this.router.navigate(['empDash/edit', index])
  }

  getTime(value: string) {
    try {
      const dates = value.split('-');

      // converting to 12hr
      if (parseInt(dates[0]) > 12) {
        const hr = (parseInt(dates[0]) % 12).toString();
        return `${hr}:${dates[1]} PM`;
      } else {
        return `${dates[0]}:${dates[1]} AM`;
      }
    } catch (err) {
      return null
    }
  }

  reRoute() {
    if (!this.user) {
      this.router.navigate(['auth/login']);
    } else {
      return;
    }
  }

}
