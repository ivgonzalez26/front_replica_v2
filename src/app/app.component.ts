import { StatusService } from './service/status.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TiendasComponent } from "./tiendas/tiendas.component";
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import * as introJs from 'intro.js';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TiendasComponent, FormsModule, NgbModule, HttpClientModule],
  providers: [StatusService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  inicio: Date = new Date();
  fin: Date = new Date();
  locales: any[] = [];
  cadena_selected = '';
  cdn_id_selected = '';
  cadenas: any[] = [];
  tiendas: any[] = [];
  tramas: any[] = [];
  local_Selected: any = null;

  constructor(private StatusService: StatusService, private modalService: NgbModal) {
    this.fin.setDate(this.inicio.getDate() - 7);
  }

  startTour() {
    const intro = introJs.default();
    intro.setOptions({
      steps: [
        {
          element: '#select_cadena',
          intro: 'Selecciona la cadena que deseas analizar utilizando este menú desplegable.'
        },
        {
          element: '#fecha_inicio',
          intro: 'Establece la fecha de inicio para definir el rango temporal desde el cual se obtendrán las tramas ejecutadas en la tienda seleccionada.'
        },
        {
          element: '#fecha_fin',
          intro: 'Establece la fecha de fin para definir el rango temporal hasta el cual se obtendrán las tramas ejecutadas en la tienda seleccionada.'
        },
        {
          element: '#filter_cadena',
          intro: 'Selecciona la cadena que deseas analizar dando click sobre el icono que corresponda.'
        },
        {
          element: '#filter_tienda',
          intro: 'Selecciona la tienda que deseas analizar dando click sobre el botón que corresponda.'
        },
      ],
      showStepNumbers: false,
      nextLabel: 'Siguiente',
      prevLabel: 'Anterior',
      doneLabel: 'Listo',
    });

    intro.start();
  }

  get_locales() {
    this.StatusService.getStatus().then((response) => {
      this.locales = response.data.status_shops.map((shop: any) => ({
        cadena: shop.cadena,
        cdn_id: shop.cdn_id,
        restaurants: shop.restaurants.map((restaurant: any) => ({
          id: restaurant.id,
          tienda: restaurant.tienda,
          application: restaurant.aplication,
          database: restaurant.database,
          rst_id: restaurant.rst_id
        }))
      }));

      this.cadenas = this.locales.map((shop: any) => shop.cadena);

      this.fill_all_tiendas();
    })
    .catch((error) => {
      console.error('Error al obtener los locales:', error);
    });
  }

  fill_all_tiendas() {
    this.tiendas = [];
    this.locales.forEach((shop) => {
      this.tiendas = [...this.tiendas, ...shop.restaurants];
    });
  }

  onCadenaChange() {
    if (this.cadena_selected === '') {
      this.fill_all_tiendas();
    }
    if(this.cadena_selected !== '') {
      const selectedShop = this.locales.find(shop => shop.cadena === this.cadena_selected);
      this.tiendas = selectedShop ? selectedShop.restaurants : [];
        this.cdn_id_selected = selectedShop ? selectedShop.cdn_id : '';
    }
  }

  onImageClick(cdn_id: string) {
    const selectedShop = this.locales.find(shop => shop.cdn_id === cdn_id);
    if (selectedShop) {
      this.cadena_selected = selectedShop.cadena;
      this.onCadenaChange();
    }
  }

  show_modal(local: any, content: any) {
    this.local_Selected = local;
    this.StatusService.getTramasLocal(Number.parseInt(this.local_Selected.rst_id), this.inicio, this.fin).then( r => {
      this.tramas = r.data.tramas;
      if (this.tramas.length == 0) {
        Swal.fire({
          title: "La tienda no tiene tramas ejecutadas",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "Continuar",
        });
      } else {
        this.modalService.open(content, { centered: true, fullscreen: true, backdrop: 'static', keyboard: false }).result.then(( response => {
        }), ( r => {}));
      }
    }).catch( e => console.log(e) );
  }

  ngOnInit(): void {
    this.get_locales()
  }

}
