// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class BookingService {
//   private apiUrl = 'http://localhost:5000/api/bookings';

//   constructor(private http: HttpClient) {}

//   createBooking(bookingData: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, bookingData);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Booking {
  _id: string;
  destination: string;
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
  room: string;
  price: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:5000/api/bookings';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<Booking[]> {  // ✅ Fix: Add missing method
    return this.http.get<Booking[]>(this.apiUrl);
  }

  createBooking(bookingData: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, bookingData);
  }
  deleteBooking(bookingId: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${bookingId}`);
}
}