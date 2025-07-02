// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { BlogComponent } from './blog/blog.component';
// import { ContactComponent } from './contact/contact.component';
// import { RoomsComponent } from './rooms/rooms.component';
// import { LoginComponent } from './login/login.component';
// import { BookingComponent } from './booking/booking.component';
// import { AdminLoginComponent } from './admin-login/admin-login.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { NavbarComponent } from './navbar/navbar.component';
// import { SidebarComponent } from './sidebar/sidebar.component';

// const routes: Routes = [
//   {path:'',component:HomeComponent},
//   {path:'rooms', component:RoomsComponent},
//   {path:'blog',component:BlogComponent},
//   {path:'contact',component:ContactComponent},
//   {path:'login',component:LoginComponent},
//   {path:'booking',component:BookingComponent},
//   {path:'admin',component:AdminLoginComponent},
//   {path:'navbar',component:NavbarComponent},
//   {path:'sidebar',component:SidebarComponent},
//   {path:'dashboard',component:DashboardComponent},
//    { path: '', redirectTo: '/admin-login', pathMatch: 'full' }
// ];


// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// User Components
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { RoomsComponent } from './rooms/rooms.component';
import { LoginComponent } from './login/login.component';
import { BookingComponent } from './booking/booking.component';

// Admin Components
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminBookingComponent } from './admin-booking/admin-booking.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';

const routes: Routes = [
  // ✅ User Routes
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'booking', component: BookingComponent },

  // ✅ Admin Login (separate from admin panel)
  { path: 'admin', component: AdminLoginComponent },

  // ✅ Admin Panel Routes Wrapped in `AdminLayoutComponent`
  {
    path: 'admin', // ✅ Corrected parent route
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'bookings', component: AdminBookingComponent },
      { path: 'users', component: AdminUsersComponent },
    ]
  },

  // ✅ Redirect Empty Route to Admin Login
  { path: '', redirectTo: '/admin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}