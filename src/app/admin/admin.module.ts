import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './pages/include/header/header.component';
import { FooterComponent } from './pages/include/footer/footer.component';
import { SidebarComponent } from './pages/include/sidebar/sidebar.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/include/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LayoutComponent,
    DashboardComponent,
    MenuItemComponent,
    EditProfileComponent,
    ChangePasswordComponent,
   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    NgbCollapseModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
