import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-tiendas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.scss']
})
export class TiendasComponent implements OnChanges {
  @Input('cadena') cadena: string = '';  // Recibe la cadena seleccionada
  @Input('locales') locales: any[] = []; // Recibe el arreglo de cadenas con restaurants
  @Output('tienda_selected') tienda_selected: EventEmitter<any> = new EventEmitter();

  // Variable para mostrar las tiendas filtradas y ordenadas
  locales_shown: any[] = [];

  ngOnChanges() {
    this.onCadenaChange(this.cadena);
  }

  onCadenaChange(cadena: string) {
    // Limpiamos las tiendas mostradas
    let filteredLocales: any[] = [];

    if (cadena === '') {
      // Si no se selecciona cadena, mostrar todas las tiendas de todas las cadenas
      filteredLocales = this.locales.flatMap(shop => shop.restaurants);
    } else {
      // Filtrar por la cadena seleccionada
      const selectedShop = this.locales.find(shop => shop.cadena.toLowerCase() === cadena.toLowerCase());
      filteredLocales = selectedShop ? selectedShop.restaurants : [];
    }

    // Ordenar las tiendas mostradas
    this.locales_shown = filteredLocales.sort((a, b) => {
      // Prioridad por conectionStatus: desconectado primero (asumiendo que es una propiedad en `restaurants`)
      if (a.conectionStatus === 'desconectado' && b.conectionStatus === 'conectado') {
        return -1;
      }
      if (a.conectionStatus === 'conectado' && b.conectionStatus === 'desconectado') {
        return 1;
      }

      // Si ambos tienen el mismo conectionStatus, ordenar por status
      if (a.conectionStatus === b.conectionStatus) {
        if (a.status === 'error' && b.status !== 'error') {
          return -1;
        }
        if (a.status !== 'error' && b.status === 'error') {
          return 1;
        }
      }

      return 0; // Si todo es igual, no se cambia el orden
    });
  }

  show_data(local: any) {
    // Emitimos el local seleccionado al padre
    this.tienda_selected.emit(local);
  }
}
