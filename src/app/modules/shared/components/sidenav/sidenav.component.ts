import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  mobileQuery: MediaQueryList;


  menuNav = [
    {name: "Home", route: "home", icon: "home"},
    {name: "Category", route: "home", icon: "category"},
    {name: "Items", route: "home", icon: "production_quantity_limits"}
  ]

  constructor(media: MediaMatcher){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  shouldRun = true;

  ngOnInit(): void {

  }
}