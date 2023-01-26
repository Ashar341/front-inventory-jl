import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from '../category/components/category/category.component';
import { HomesComponent } from './components/homes/homes.component';

const childRoutes: Routes = [
    { path: '', component: HomesComponent },
    { path: 'home', component: HomesComponent },
    {path: 'category', component: CategoryComponent}

]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule],
})
export class RouterChildModule { }
