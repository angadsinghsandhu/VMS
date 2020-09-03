import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, Params, ParamMap } from "@angular/router";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  // Instantiating Service
  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  // variables
  x = window.location.href
  name: string = "";
  status: string = "passive";
  emp: Boolean = false;
  colors: Array<string> = ['red', 'green', 'blue'];
  selectColor: string;
  employees: Array<Object> = [
    { "id": 1, "name": "Andrew", "age": 20 },
    { "id": 2, "name": "Bran", "age": 25 },
    { "id": 3, "name": "Drew", "age": 29 }
  ]

  ngOnInit(): void {
    // subscribing to the observable
    this.userService.getUser()
      .subscribe(data => this.user = data,
        err => this.errMsg = err);

    // paramMap Component
    this.route.paramMap.subscribe((param: ParamMap) => {
      let color = param.get("id");
      this.selectColor = color;
    });

  }

  user: Object = {};
  errMsg: any;

  public date = new Date();
  // date = Date.now()

  // getting input from app parent
  @Input('parentData') public data;

  //sending data to parent using events
  //getting event emitter
  @Output() public childEvent = new EventEmitter();

  nameAdd(str: string): string {
    return str + "123"
  }

  fireEvent() {
    this.childEvent.emit("hey bro");
  }

  // going to login page when clicked on color array 
  onSelect(color, index) {
    // absolute path
    this.router.navigate(['/auth/signup', color, { id: color }]); // Link parameters array

    // relative path
    this.router.navigate([color, { id: color }], { relativeTo: this.route }); // Link parameters array
  }

  isSelected(color) {
    return color == this.selectColor;
  }

}
