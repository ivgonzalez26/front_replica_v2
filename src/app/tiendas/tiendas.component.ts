import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-tiendas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tiendas.component.html',
  styleUrl: './tiendas.component.scss'
})
export class TiendasComponent implements OnChanges {
  @Input('cadena') cadena: string = '';
  @Input('locales') locales: any[] = [];
  @Output('tienda_selected') tienda_selected: EventEmitter<any> = new EventEmitter();

  // Variable para mostrar los locales ordenados
  locales_shown: any[] = [];

  ngOnChanges() {
    this.onMarcaChange(this.cadena);
  }

  onMarcaChange(cadena: string) {
    let filteredLocales = [...this.locales];

    // Filtro por marca si es necesario
    if (cadena !== '') {
      filteredLocales = filteredLocales.filter(local => local.marca.toLowerCase() === cadena.toLowerCase());
    }

    // Ordenamos primero por conectionStatus y luego por status
    this.locales_shown = filteredLocales.sort((a, b) => {
      // Prioridad por conectionStatus: desconectado primero
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
    this.tienda_selected.emit(local);
  }
}
