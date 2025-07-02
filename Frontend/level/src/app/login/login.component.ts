import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode: string = 'login'; // ✅ Default login mode
  loginForm: FormGroup;
  registerForm: FormGroup;
  bookingDetails: any = {};

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      phone: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.bookingDetails = params; // ✅ Store booking details including hotel name
    });
  }

  toggleMode(mode: string): void {
    this.mode = mode; // ✅ Switch between login & register
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          localStorage.setItem('loggedIn', 'true');
          this.router.navigate(['/booking'], { queryParams: this.bookingDetails }); // ✅ Pass booking details
        },
        error: () => {
          alert('Invalid credentials.');
        }
      });
    }
  }
  onRegister(): void {
  if (this.registerForm.valid) {
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        alert('Registration successful! Please log in.');
        this.toggleMode('login'); // ✅ Switch to login after registration
      },
      error: () => {
        alert('Registration failed. Please try again.');
      }
    });
  } else {
    alert('Please fill all required fields.');
  }
}
}