import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from '../contact.service'; // ✅ Import service

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  submittedData: any[] = [];

  constructor(private contactService: ContactService) {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService.submitContactForm(this.contactForm.value).subscribe({
        next: (response) => {
          alert(response.message);
          this.submittedData.push(this.contactForm.value);
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('Error submitting contact:', error);
        }
      });
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}