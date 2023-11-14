import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './user/not-found/not-found.component';
import { LayoutComponent } from './user/pages/include/layout/layout.component';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./user/user.module').then(module => module.UserModule)
  },
  {
    path:'admin',
    loadChildren:()=>import('./admin/admin.module').then(module => module.AdminModule)
  },
  {
    path:'**',
    component:LayoutComponent,
    children:[
      {
        path:'**',
        component:NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
