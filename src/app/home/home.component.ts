import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private config: NgbCarouselConfig) {
  }

  showNavigationArrows = true;
  showNavigationIndicators = true;
  images = [
    "https://cdn.clipart.email/038f1ddeaafbcb192e03474cbeaf9116_silhouette-of-businessman-dressing-up-suit-jacket-in-front-of-the-_3840-2160.png",
    "https://www.helloverify.com/content/images/banner4.png",
    "https://i.pinimg.com/originals/e1/e8/8e/e1e88e69109c22068694d3894e649370.jpg"
  ]

  ngOnInit(): void {

    // reloading once
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('foo');
    }

    // customize default values of carousels used by this component tree
    this.config.showNavigationArrows = true;
    this.config.showNavigationIndicators = true;
  }

}
