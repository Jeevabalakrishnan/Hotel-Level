import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'level';
  isAdminRoute = false;

  @ViewChild('mainNav') mainNav!: ElementRef;
  private bsCollapse: any;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isAdminRoute = this.router.url.startsWith('/admin');
        window.scrollTo(0, 0); // Optional scroll-to-top on route change
      });
  }

  ngAfterViewInit(): void {
    // Initialize the Bootstrap Collapse after view is ready
    this.bsCollapse = new bootstrap.Collapse(this.mainNav.nativeElement, { toggle: false });
  }

  closeNavbar(): void {
    if (window.innerWidth < 992 && this.bsCollapse) {
      this.bsCollapse.hide();
    }
  }
}