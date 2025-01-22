import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FirstPageComponent } from "../first-page/first-page.component";
import { FeaturesPageComponent } from "../features-page/features-page.component";
import { ContactPageComponent } from "../contact-page/contact-page.component";

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [NavbarComponent, FirstPageComponent, FeaturesPageComponent, ContactPageComponent],
  templateUrl: "./landingpage.component.html",
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent {

}
