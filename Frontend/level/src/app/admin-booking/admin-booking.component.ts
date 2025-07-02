// import { Component, OnInit } from '@angular/core';
// import { BookingService } from '../booking.service';

// interface Booking {
//   _id: string;
//   destination: string;
//   checkin: string;
//   checkout: string;
//   adults: number;
//   children: number;
//   room: string;
//   price: string;
// }

// @Component({
//   selector: 'app-admin-booking',
//   templateUrl: './admin-booking.component.html',
//   styleUrls: ['./admin-booking.component.css']
// })
// export class AdminBookingComponent implements OnInit {
//   bookings: Booking[] = [];

//   constructor(private bookingService: BookingService) {}

//   ngOnInit(): void {
//     this.fetchBookings();
//   }

//   fetchBookings(): void {
//     this.bookingService.getBookings().subscribe({
//       next: (data: Booking[]) => {  // ✅ Define type explicitly
//         this.bookings = data.reverse();
//       },
//       error: (err: any) => console.error('Error fetching bookings:', err) // ✅ Explicitly define `err`
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

@Component({
  selector: 'app-admin-booking',
  templateUrl: './admin-booking.component.html',
  styleUrls: ['./admin-booking.component.css']
})
export class AdminBookingComponent implements OnInit {
  bookings: Booking[] = [];
  selectedRows: string[] = [];
  selectAll = false;
  viewBooking: Booking | null = null;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private bookingService: BookingService, public modalService: NgbModal) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.bookingService.getBookings().subscribe({
      next: (data) => this.bookings = data.reverse(),
      error: (err) => console.error('Error fetching bookings:', err)
    });
  }

  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const currentPageIds = this.currentBookings.map(booking => booking._id);
    this.selectAll = checked;
    this.selectedRows = checked ? currentPageIds : [];
  }

  toggleSelect(id: string): void {
    this.selectedRows.includes(id) ?
      this.selectedRows = this.selectedRows.filter(i => i !== id) :
      this.selectedRows.push(id);
  }

  openModal(booking: Booking, content: any): void {
    this.viewBooking = booking;
    this.modalService.open(content);
  }

  totalPages(): number {
    return Math.ceil(this.bookings.length / this.itemsPerPage);
  }

deleteBooking(bookingId: string): void {
  if (!bookingId) {
    console.error('❌ Booking ID is missing');
    return;
  }

  const isConfirmed = window.confirm('Are you sure you want to delete this booking?');
  if (!isConfirmed) return; // ⛔ Stop deletion if user cancels

  this.bookingService.deleteBooking(bookingId).subscribe({
    next: () => this.fetchBookings(), // ✅ Refresh bookings
    error: (err) => console.error('❌ Delete request failed:', err),
  });
}
  deleteSelected(): void {
    if (!confirm('Delete selected bookings?')) return;
    this.selectedRows.forEach(id => {
      this.bookingService.deleteBooking(id).subscribe(() => {
        this.fetchBookings();
      });
    });
    this.selectedRows = [];
    this.selectAll = false;
  }

  get currentBookings(): Booking[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.bookings.slice(start, start + this.itemsPerPage);
  }
exportToExcel(): void {
  if (this.selectedRows.length === 0) {
    alert("❌ Please select bookings to export!");
    return;
  }
  
  const selectedData = this.bookings.filter(booking => this.selectedRows.includes(booking._id));
  const ws = XLSX.utils.json_to_sheet(selectedData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Bookings");
  XLSX.writeFile(wb, "bookings.xlsx");
}

exportToCSV(): void {
  if (this.selectedRows.length === 0) {
    alert("❌ Please select bookings to export!");
    return;
  }

  const selectedData = this.bookings.filter(booking => this.selectedRows.includes(booking._id));
  const ws = XLSX.utils.json_to_sheet(selectedData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Bookings");
  XLSX.writeFile(wb, "bookings.csv");
}

exportToPDF(): void {
  if (this.selectedRows.length === 0) {
    alert("❌ Please select bookings to export!");
    return;
  }

  const selectedData = this.bookings.filter(booking => this.selectedRows.includes(booking._id));
  const doc = new jsPDF();
  
  autoTable(doc, {
    head: [["Destination", "Check-In", "Check-Out", "Room", "Price"]],
    body: selectedData.map(b => [b.destination, b.checkin, b.checkout, b.room, `₹${b.price}`])
  });

  doc.save("bookings.pdf");
}
 get paginationNumbers(): number[] {
    return Array(this.totalPages()).fill(0).map((_, i) => i + 1);
  }
}
