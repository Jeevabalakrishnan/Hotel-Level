import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  bookingDetails: any = {};
  selectedHotel: string = ''; // ✅ Store selected hotel

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params && Object.keys(params).length) {
        this.bookingDetails = params; // ✅ Ensure params exist before assigning
      } else {
        console.warn('No booking details found.');
      }
    });
  }

  selectHotel(hotelName: string): void {
    this.selectedHotel = hotelName; // ✅ Store selected hotel name
  }

bookNow(roomType: string, price: number): void {
  console.log('Navigating to login with:', {
    ...this.bookingDetails,
    hotel: this.selectedHotel || 'Default Hotel',
    room: roomType,
    price: price // ✅ Add price
  });

  this.router.navigate(['/login'], { 
    queryParams: { 
      ...this.bookingDetails, 
      hotel: this.selectedHotel || 'Default Hotel',
      room: roomType,
      price: price // ✅ Ensure price is passed
    }
  });
}
}