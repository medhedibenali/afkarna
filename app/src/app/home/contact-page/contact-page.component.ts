import { Component, inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { contactPageService } from "./contact-page.service";
import { ContactDto } from "./contact.dto";
import { Router } from "@angular/router";

@Component({
  selector: "app-contact-page",
  templateUrl: "./contact-page.component.html",
  imports: [ReactiveFormsModule],
  styleUrls: ["./contact-page.component.css"],
})
export class ContactPageComponent implements OnInit {
  private router = inject(Router);
  private contactPageService = inject(contactPageService);
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      message: ["", Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }
    this.contactPageService.contact(this.contactForm.value as ContactDto)
      .subscribe(() => {
      });
    alert("Post created successfully!");
    this.contactForm.reset();
  }
}
