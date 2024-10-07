import { StatusService } from './service/status.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TiendasComponent } from "./tiendas/tiendas.component";
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TiendasComponent, FormsModule, NgbModule, HttpClientModule],
  providers: [StatusService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  inicio: Date = new Date();
  fin: Date = new Date();
  locales: any[] = [];

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

  constructor(private StatusService: StatusService, private modalService: NgbModal) {}

  get_locales(){
    this.StatusService.getStatus().then((response) => {
          this.locales = response.data.status_shops.map((shop: any) => ({
            tienda: shop.tienda,
            application: shop.aplication ? true : false,
            database: shop.database ? true : false
          }));
      })
      .catch((error) => {
        console.error('Error al obtener los locales:', error);
      });
  }

  show_modal(local: any, content: any) {
    this.local_Selected = local;
    /*
    this.StatusService.getTramasLocal(this.local_Selected.rst_id, this.inicio, this.fin).then( r => {
      this.tramas = r.tramas;
      this.modalService.open(content, { centered: true, fullscreen: true, backdrop: 'static', keyboard: false }).result.then(( response => {
      }), ( r => {}));
    }).catch( e => console.log(e) );
    */
  }

  ngOnInit(): void {
    this.get_locales()
  }

}
