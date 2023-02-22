import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.getProducts();
  }

  //Para crear la tabla con angular material
  displayedColumns: string[] = ['id','name', 'price', 'account','category', 'picture', 'actions'];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator !: MatPaginator;

  getProducts(){
    this.productService.getProducts().subscribe( (data:any ) => {
      console.log("Respuesta de productos", data);
      this.processProductResponse(data);
    }, (error: any) => {
      console.log("Error en productos", error);
    })
  }

  //para procesar la respuesta del servicio getProducts
  processProductResponse(resp: any){
    const dateProduct:ProductElement[] =[];
    if( resp.metadata[0].code == "00"){
      // Es la lista que sale en el metada de la consola
      let listCProduct = resp.product.products;

      //Aqui se produnfiza mas el metadata para que sea lo del interface ProducElement
      listCProduct.forEach((element: ProductElement) => {
        element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,'+element.picture;
        dateProduct.push(element); //Guardar los elementos
      });
      
      //seteamos el datasource
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator = this.paginator;

    }
  }

}

export interface ProductElement {
  id: number;
  name: string;
  price: number;
  account: number;
  category: any;
  picture: any;
}