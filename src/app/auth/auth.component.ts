import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) { }

  color: any;

  ngOnInit(): void {
    // for integers we use parseInt

    // snapshot approach
    let color = this.route.snapshot
      .paramMap.get("id");
    // this.color = color;

    // paramMap Observable method 
    this.route.paramMap.subscribe((param: ParamMap) => {
      let color = param.get('id');
      this.color = color
    });
  }

  goPrev() {

  }

  goNext() {
    let id =
      this.router.navigate
  }

  // optional route parameters
  goBack() {
    let selectedColor = this.color ? this.color : null;
    this.router.navigate(['/test', { id: selectedColor }]);
  }
}
