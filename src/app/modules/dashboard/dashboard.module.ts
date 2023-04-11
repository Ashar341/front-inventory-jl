import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component';
import { HomesComponent } from './components/homes/homes.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CategoeryModule } from '../category/categoery.module';
import { ProductModule } from '../product/product.module';
import { MaterialModule } from '../shared/material.module';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    DashboardComponent,
    HomesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoeryModule,
    ProductModule,
    MaterialModule,
    NgChartsModule,
  ]
})
export class DashboardModule { }
