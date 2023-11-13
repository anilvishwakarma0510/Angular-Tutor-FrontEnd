import { Component, EventEmitter, HostListener, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/admin/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class LayoutComponent {
  constructor(
    private router:Router,
    private authService:AuthService
    ){}

  ngOnInit(){
  }

  isSidebarToggled = false;
  isScrollToTopVisible = false;

  //@Output() toggleSidebarEvent = new EventEmitter<void>();

  toggleSidebar() {
    this.isSidebarToggled = !this.isSidebarToggled;
    console.log('toggle')
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    if (window.innerWidth < 768) {
      this.isSidebarToggled=true;
    } else {
      this.isSidebarToggled=false;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const scrollDistance = window.scrollY || document.documentElement.scrollTop;
    this.isScrollToTopVisible = scrollDistance > 100;
  }
}
