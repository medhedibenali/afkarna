import { Component } from "@angular/core";
import { NavbarComponent } from "../home/navbar/navbar.component";
import { FirstPageComponent } from "../home/first-page/first-page.component";
import { FeaturesPageComponent } from "../home/features-page/features-page.component";
import { ContactPageComponent } from "../home/contact-page/contact-page.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-homepage",
  standalone: true,
  imports: [
    NavbarComponent,
    FirstPageComponent,
    FeaturesPageComponent,
    ContactPageComponent,
    RouterLink,
  ],
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent {
}
