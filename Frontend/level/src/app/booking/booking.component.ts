import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  isLoggedIn: boolean = false;

constructor(private route: ActivatedRoute, private bookingService: BookingService, private router: Router) {
  this.bookingForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    destination: new FormControl('', [Validators.required]),
    hotel: new FormControl('', [Validators.required]),
    checkin: new FormControl('', [Validators.required]),
    checkout: new FormControl('', [Validators.required]),
    adults: new FormControl('', [Validators.required]),
    children: new FormControl('', [Validators.required]),
    room: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]) // ✅ Added price field
  });
}

ngOnInit(): void {
  this.isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  this.route.queryParams.subscribe(params => {
    console.log('Received booking details:', params); // ✅ Debug received parameters

    const filledParams = {
      name: params['name'] || '',
      email: params['email'] || '',
      destination: params['destination'] || 'Default Destination',
      hotel: params['hotel'] || 'Default Hotel',
      checkin: params['checkin'] || '',
      checkout: params['checkout'] || '',
      adults: params['adults'] || 1,
      children: params['children'] || 0,
      room: params['room'] || 'Standard Room',
      price: params['price'] || 0 // ✅ Ensure price is stored
    };

    console.log('Final booking details after fixing:', filledParams); // ✅ Debug updated values
    this.bookingForm.patchValue(filledParams);
  });
}
confirmBooking(): void {
  console.log('Booking Form Values before submission:', this.bookingForm.value); // ✅ Debug form data

  if (!this.bookingForm.value.hotel || this.bookingForm.value.hotel === '') {
    console.warn('Hotel field is missing when submitting. Adding default.');
    this.bookingForm.patchValue({ hotel: 'Default Hotel' }); // ✅ Temporary fix before submission
  }

  if (this.bookingForm.valid) {
    this.bookingService.createBooking(this.bookingForm.value).subscribe({
      next: () => {
        alert('Booking confirmed!');
        this.bookingForm.reset(); // ✅ Clears all form fields
        this.router.navigate(['/']); // ✅ Redirects to home page
      },
      error: (error) => {
        console.error('Booking submission failed:', error);
        alert('Error confirming booking.');
      }
    });
  } else {
    console.warn('Form validation passed, but fields might be empty:', this.bookingForm.value);
    alert('Please ensure all fields are correctly filled.');
  }
}
}