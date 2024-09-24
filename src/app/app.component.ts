import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TiendasComponent } from "./tiendas/tiendas.component";
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TiendasComponent, FormsModule, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  cadena_selected = '';
  cadenas: string[] = ['American Deli',
                       'Baskin Robbins',
                       'Cafe Astoria',
                       'Cajun',
                       'Casa Res',
                       'Cinnabon',
                       'Dolce Incontro',
                       'Embutser',
                       'El Español',
                       'Federer',
                       'Gus',
                       'Il Cappo',
                       'Juan Valdez',
                       'KFC',
                       'Menestras del Negro',
                       'Tropi Burger'];
  tramas: any[] = [];
  local_Selected: any = null;
  locales: any[] = [
    {
      local: "kfc 4",
      conectionStatus: "desconectado",
      status: "error",
      marca: "KFC"
    },
    {
      local: "kfc 5",
      conectionStatus: "conectado",
      status: "exitoso",
      marca: "Menestras del negro"
    },
    {
      local: "kfc 6",
      conectionStatus: "conectado",
      status: "sincronizando",
      marca: "Tropi burger"
    },
    {
      local: "kfc 4",
      conectionStatus: "desconectado",
      status: "error",
      marca: "Tropi burger"
    },
    {
      local: "kfc 5",
      conectionStatus: "conectado",
      status: "exitoso",
      marca: "KFC"
    },
    {
      local: "kfc 6",
      conectionStatus: "conectado",
      status: "sincronizando",
      marca: "KFC"
    },
    {
      local: "kfc 4",
      conectionStatus: "desconectado",
      status: "error",
      marca: "Tropi burger"
    },
    {
      local: "kfc 5",
      conectionStatus: "conectado",
      status: "exitoso",
      marca: "KFC"
    },
    {
      local: "kfc 6",
      conectionStatus: "conectado",
      status: "sincronizando",
      marca: "Menestras del negro"
    }
  ];


  constructor(private modalService: NgbModal) {}

  show_modal(local: any, content: any) {
    this.local_Selected = local;
    this.tramas = [
      {id: 1, statement: 'UNA SENTENCIA', result: 'un resultado', rst_id: 15, status: 'ok'},
      {id: 1, statement: 'UNA SENTENCIA', result: 'un resultado', rst_id: 15, status: 'error'},
      {id: 1, statement: 'UNA SENTENCIA', result: 'un resultado', rst_id: 15, status: 'ok'},
      {id: 1, statement: 'UNA SENTENCIA', result: 'un resultado', rst_id: 15, status: 'ok'},
      {id: 1, statement: 'UNA SENTENCIA', result: 'un resultado', rst_id: 15, status: 'ok'},
      {id: 1, statement: 'UNA SENTENCIA', result: 'un resultado', rst_id: 15, status: 'ok'}
    ];
    this.modalService.open(content, { centered: true, fullscreen: true, backdrop: 'static', keyboard: false }).result.then(( response => {
    }), ( r => {}));
  }
}
