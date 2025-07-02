
//   ngOnInit(): void {
//     // Scroll to top on route change
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    //   }
    // });
//   }

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bookingForm: FormGroup;
  availableRooms: any = [];

  constructor(private router: Router, private myservice: MyserviceService) { 
    this.bookingForm = new FormGroup({
      destination: new FormControl('', Validators.required),
      checkin: new FormControl('', Validators.required),
      checkout: new FormControl('', Validators.required),
      adults: new FormControl('', Validators.required),
      children: new FormControl('', Validators.required),
      room: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    const checkinInput = document.querySelector("#checkin") as HTMLInputElement;
    const checkoutInput = document.querySelector("#checkout") as HTMLInputElement;

    flatpickr(checkinInput, {
      dateFormat: "d-m-y",
      onChange: (selectedDates) => {
        if (selectedDates.length > 0) {
          const selectedDate = selectedDates[0];
          const nextDay = new Date(selectedDate);
          nextDay.setDate(nextDay.getDate() + 1);
          flatpickr(checkoutInput, { dateFormat: "d-m-y", minDate: nextDay });
        }
      }
    });

    flatpickr(checkoutInput, { dateFormat: "d-m-y" });

    this.myservice.getAvailableRooms().subscribe({
      next: (response) => {
        this.availableRooms = response;
        console.log('Fetched Rooms:', this.availableRooms);
      },
      error: (error) => {
        console.error('API Fetch Error:', error);
      }
    });
  }

  checkAvailability() {
    if (this.bookingForm.valid) {
      this.router.navigate(['/rooms'], { queryParams: this.bookingForm.value }); // ✅ Pass data via query params
    } else {
      alert("Please fill in all fields before proceeding.");
    }
  }
}