import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomesComponent } from './components/homes/homes.component';

const childRoutes: Routes = [
    { path: '', component: HomesComponent },
    { path: 'home', component: HomesComponent },

]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule],
})
export class RouterChildModule { }
