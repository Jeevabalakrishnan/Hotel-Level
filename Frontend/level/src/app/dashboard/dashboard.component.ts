import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalBookings = 0;
  totalGuests = 0;
  checkedInGuests = 0;
  checkedOutGuests = 0;
  users: any[] = [];
  bookings: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchDashboardData();
    this.fetchUsers();
    this.fetchBookings();
  }

  fetchDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        this.totalBookings = data.totalBookings;
        this.totalGuests = data.totalGuests;
        this.checkedInGuests = data.checkedInGuests;
        this.checkedOutGuests = data.checkedOutGuests;
      },
      error: (error) => console.error('Error fetching dashboard data:', error),
    });
  }

  fetchUsers(): void {
    this.dashboardService.getUsers().subscribe({
      next: (data) => {
        this.users = data.users;
      },
      error: (error) => console.error('Error fetching users:', error),
    });
  }

  fetchBookings(): void {
    this.dashboardService.getBookings().subscribe({
      next: (data) => {
        this.bookings = data.bookings;
      },
      error: (error) => console.error('Error fetching bookings:', error),
    });
  }
}