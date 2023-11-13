import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/include/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { adminGuard } from '../guard/admin.guard';


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
