import { Component } from '@angular/core';
import { faDownload,faCalendar,faDollarSign,faClipboardList,faComments,faChartArea,faTable } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  icons = {
    faDownload,
    faCalendar,
    faDollarSign,
    faClipboardList,
    faComments,
    faChartArea,
    faTable
  }
}
