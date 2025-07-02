import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

onSubmit(): void {
  if (this.loginForm.invalid) return;

  this.loading = true;
  const { email, password } = this.loginForm.value;

  // ✅ Validate admin credentials before making API call
  if (email !== 'admin@gmail.com' || password !== 'admin@2025') {
    alert('❌ Invalid credentials. Only the correct admin email and password are allowed.');
    this.loading = false;
    return;
  }

  // ✅ Proceed with API call if credentials match
  this.http.post<any>('http://localhost:5000/api/admin/login', { email, password })
    .subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('adminToken', res.token);
          alert('✅ Login Successful');
          this.router.navigate(['/admin/dashboard']);
        } else {
          alert('❌ Invalid credentials');
        }
      },
      error: (err) => {
        const msg = err.error?.message || '⚠ Network error. Please try again!';
        alert(`⚠ Login failed: ${msg}`);
      }
    })
    .add(() => this.loading = false);
}
}
