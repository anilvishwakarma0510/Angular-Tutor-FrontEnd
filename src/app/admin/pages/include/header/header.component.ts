import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/admin/auth.service';
import { faBarChart,faSearch,faBell,faFileAlt,faDonate,faExclamationTriangle,faEnvelope,faUser,faCogs,faList,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/Interface/IUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user:Iuser|null = null;

  constructor(
    private Auth:AuthService,
    private Router:Router
    ){

  }

  ngOnInit(){
    this.Auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  icons  = {
    faBarChart,
    faSearch,
    faBell,
    faFileAlt,
    faDonate,
    faExclamationTriangle,
    faEnvelope,
    faUser,
    faCogs,
    faList,
    faSignOutAlt,
  }

  @Input() isSidebarShow: boolean = false;
  @Output() SidebarToggled = new EventEmitter<boolean>();

  showProfileIcon:boolean = false;
  toggelProfileIcon(){
    this.showProfileIcon = !this.showProfileIcon
  }

  toggleSidebar(){
    this.isSidebarShow = !this.isSidebarShow;
    this.SidebarToggled.emit();
  }

  logOut(){
    this.Auth.logOut();
    this.Router.navigate(['/admin/login']);
  }
}
