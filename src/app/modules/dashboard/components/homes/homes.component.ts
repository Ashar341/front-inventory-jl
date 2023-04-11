import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { ProductElement } from 'src/app/modules/product/product/product.component';
import { ProductService } from 'src/app/modules/shared/services/product.service';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit {

  chartBar: any;
  constructor(private productService : ProductService) { 

  }

  ngOnInit(): void {
    this.getProducts();
  }

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
    
const nameProduct: String[] = [];
const account: number [] = [];

    if( resp.metadata[0].code == "00"){
      // Es la lista que sale en el metada de la consola
      let listCProduct = resp.product.products;

      //Aqui se produnfiza mas el metadata para que sea lo del interface ProducElement
      listCProduct.forEach((element: ProductElement) => {
        nameProduct.push(element.name);
        account.push(element.account)
      });
      
      // Hacer graficos de barras

      this.chartBar = new Chart('canvas-bar', {
        type: 'bar',
        data: {
          labels: nameProduct,
          datasets: [{
            label: 'Productos', 
            data: account,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderWidth: 2,
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
          }]
        },
        
      });
    }
  }
  
}
