import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DashService } from '../services/dash.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private dashService: DashService) { }

  // variables
  user;
  entrys;
  emp_id;
  visit_date = "2020-01-01";

  submitted = false;
  idSearch: boolean;
  errMsg;

  ngOnInit(): void {
    this.submitted = false;
    this.idSearch = true;
  }

  onSearch() {

    this.submitted = true;

    // creating search object
    const search = {
      type: "id",
      emp_id: this.emp_id,
      visit_date: this.visit_date
    }

    if (!this.idSearch) {
      this.emp_id = null

      // editing search object type
      search.type = "date";

    } else {
      this.visit_date = null
    }

    // retriving user and adding entrys
    this.dashService.onSearch(search)
      .subscribe(data => {
        this.user = data;
        this.entrys = data?.entrys;
      }, err => {
        this.errMsg = err.statusText;
      });
  }

  // deleting user
  onDelUser() {
    if (!this.user.emp_id) {
      this.errMsg = "no employee present, reload page and search by ID"
    } else {
      this.dashService.onDelUser(this.user.emp_id)
        .subscribe(data => {
          console.log(data);
          window.location.reload();
        }, err => {
          console.error(`error occured in deleting user : ${err}`);
          this.errMsg = "error occored in deleting user";
        }
        )
    }
  }

  // deleting entry
  onDelEntry(emp_id, entry_num) {
    this.dashService.onDelEntry(emp_id, entry_num)
      .subscribe(data => {
        console.log("entry deleted");
        this.onSearch();
      }, err => {
        console.error(`error occured in deleting entry : ${err}`);
        this.errMsg = "error occored in deleting entry";
      }
      );
  }

  // updating user
  onUpdateUser() {

  }

  // updating entry
  onUpdateEntry(emp_id, entry_num) {

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

}
