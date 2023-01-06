import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component';
import { HomesComponent } from './components/homes/homes.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashboardComponent,
    HomesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DashboardModule { }
