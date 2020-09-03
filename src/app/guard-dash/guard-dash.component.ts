import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { userModel } from '../models/models'
import { Router } from '@angular/router';
import { GuardService } from '../services/guard.service';
import { strict } from 'assert';

@Component({
  selector: 'app-guard-dash',
  templateUrl: './guard-dash.component.html',
  styleUrls: ['./guard-dash.component.css']
})
export class GuardDashComponent implements OnInit {
  constructor(private router: Router,
    private authService: AuthService,
    private guardService: GuardService) {
  }

  // variables
  user: userModel = null;
  errUser: string = null;
  entrys;

  isExit: boolean = false;
  exit_time: any = { hour: 8, minute: 0 };

  filter: string = "all";

  ngOnInit(): void {

    this.isExit = false;

    // reloading once
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('foo');
    }

    // getting back user
    try {
      this.user = this.authService.getUser();
    } catch (err) {
      console.log(`getting up user failed (emp-dash.c.ts) with error : ${err}`)
      this.errUser = "some error occured while retriving user";
    }

    // re-routing if invalid
    this.reRoute();

    // getting today into an object
    var today = new Date();
    var dateObj = {
      "year": today.getFullYear(),
      "month": (today.getMonth() + 1).toString().padStart(2, "0"),
      "date": today.getDate().toString().padStart(2, "0")
    }

    // getting back todays entries
    this.guardService.checkAll(dateObj)
      .subscribe(data => {
        this.entrys = data;
      });

  }

  setFilter(val: string) {
    this.filter = val;
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

  onEntry(emp_id, entry_num) {
    this.router.navigate(['guardDash/entry', emp_id, entry_num])
  }

  onExit(index: number) {

    this.isExit = !this.isExit

    // changing the "entry_time" attribute to a string
    var hour = (this.exit_time.hour).toString().padStart(2, "0");
    var min = (this.exit_time.minute).toString().padStart(2, "0");
    this.exit_time = `${hour}-${min}`
    this.entrys[index].exit_time = this.exit_time


    // add to service
    this.guardService.onExit(this.exit_time, this.entrys[index].emp_id, this.entrys[index].index)
      .subscribe(data => {
        console.log('exit time added');
      }, err => {
        console.error(`error occored in adding exit time : ${err}`);
      })

    // clearing space
    this.exit_time = { hour: hour, minute: min };
    hour = min = null;
  }

  reRoute() {
    if (!this.user) {
      this.router.navigate(['auth/login']);
    } else {
      return;
    }
  }

}
