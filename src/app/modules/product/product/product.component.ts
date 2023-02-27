import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NewCategoryComponent } from '../../category/components/new-category/new-category.component';
import { ProductService } from '../../shared/services/product.service';
import { NewProductComponent } from '../new-product/new-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  constructor(private productService: ProductService,
      public dialog: MatDialog, private snackBar: MatSnackBar) {  }
  
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
        //element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,'+element.picture;
        dateProduct.push(element); //Guardar los elementos
      });
      
      //seteamos el datasource
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator = this.paginator;


    }
  }

  edit(id: number, name: string, price:number, account: number, category: any){
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px',
      data: {id: id, name: name, price: price, account: account, category: category}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      
      if(result == 1){
        this.openSnackbar("Producto editado!", "Exitosa");
        this.getProducts();
      } else if (result == 2){
        this.openSnackbar("Se produjo un error al editar el producto", "Error");
      }
    });
  }

  openProductDialog(){
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px',
      
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      
      if(result == 1){
        this.openSnackbar("Categoria Actualizada con Exito!", "Exitosa");
        this.getProducts();
      } else if (result == 2){
        this.openSnackbar("Se produjo un error al actualizar la categoria", "Error");
      }
    });
  }

  openSnackbar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    })
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