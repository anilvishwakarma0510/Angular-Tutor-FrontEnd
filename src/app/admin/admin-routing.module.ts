import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/include/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { adminGuard } from '../guard/admin.guard';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';


const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    canActivate:[adminGuard],
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'edit-profile',
        component:EditProfileComponent
      },
      {
        path:'change-password',
        component:ChangePasswordComponent
      },
      {
        path:'',
        redirectTo:'/admin/dashboard',
        pathMatch:'full'
      }
      
    ]
  
  },
  {
    path:'login',
    component:LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
