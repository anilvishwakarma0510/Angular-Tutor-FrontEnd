import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './pages/include/footer/footer.component';
import { HeaderComponent } from './pages/include/header/header.component';
import { LayoutComponent } from './pages/include/layout/layout.component';
import { AboutComponent } from './pages/about/about.component';
import { ServiceComponent } from './pages/service/service.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ContactDetailComponent } from './pages/contact-detail/contact-detail.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { PortfolioDetailComponent } from './pages/portfolio-detail/portfolio-detail.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { NotFoundComponent } from './not-found/not-found.component';
//import "../../assets/css/style.scss"


@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    AboutComponent,
    ServiceComponent,
    BlogDetailComponent,
    BlogComponent,
    ContactComponent,
    ContactDetailComponent,
    PortfolioComponent,
    PortfolioDetailComponent,
    TeamsComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
