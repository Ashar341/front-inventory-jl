import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  mobileQuery: MediaQueryList;
  username: any;

  menuNav = [
    {name: "Inicio", route: "home", icon: "home"},
    {name: "Categorias", route: "category", icon: "category"},
    {name: "Productos", route: "product", icon: "production_quantity_limits"}
  ]

  constructor(media: MediaMatcher, private keycloackService: KeycloakService){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  shouldRun = true;

  //Este metodo cambia el nombre de usuario y correo en el sidenav
  // pero tienes que pones {{username}} en el html
  ngOnInit(): void {
    this.username = this.keycloackService.getUsername();
  }

  logout(){
    this.keycloackService.logout();
  }
}
