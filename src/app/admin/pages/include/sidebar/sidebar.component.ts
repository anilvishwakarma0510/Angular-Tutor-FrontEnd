import { Component,  Input} from '@angular/core';
import { faLaughWink,faTachometerAlt,faCog,faWrench,faFolder,faChartArea,faTable,faChevronLeft,faChevronRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  icons = {
    faLaughWink,
    faTachometerAlt,
    faCog,
    faWrench,
    faFolder,
    faChartArea,
    faTable,
    faChevronLeft,
    faChevronRight
  }

  @Input() isSidebarShow: boolean = false;

  toggleClas(){
    this.isSidebarShow = !this.isSidebarShow
  }
}
