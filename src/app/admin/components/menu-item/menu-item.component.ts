import { Component, Input } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { faChevronRight,faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {

  faChevronRight = faChevronRight;
  faChevronCircleDown = faChevronCircleDown;
  @Input() icon:any;
  @Input() title:unknown='';
  @Input() subTitle:unknown='';
  @Input() menuItems:{link:unknown,text:unknown}[]=[];
  @Input() isToggled: boolean = true;

  isCollaps:boolean = true;
  toggleCollaps(){
    this.isCollaps = !this.isCollaps
    const collapseElement = document.getElementById('collapsmenu');
    if (collapseElement) {
      
      if (this.isCollaps) {
        collapseElement.classList.remove('collapsed');
      } else {
        collapseElement.classList.add('collapsed');
      }
    }
  }

}
