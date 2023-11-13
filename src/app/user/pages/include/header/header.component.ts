import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isScrolled:boolean = true

  @HostListener('window:scroll',['$event'])
  onScroll(event:Event):void{
    if (window.scrollY > 0) {
      this.isScrolled = false;
    } else {
      this.isScrolled = true;
    }
  }
}
