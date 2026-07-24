import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';



import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    PageHeaderComponent,
    BreadcrumbComponent,
    ThemeToggleComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    PageHeaderComponent,
    BreadcrumbComponent,
    ThemeToggleComponent
  ]
})
export class SharedModule { }
