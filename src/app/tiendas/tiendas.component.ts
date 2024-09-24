import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tiendas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tiendas.component.html',
  styleUrl: './tiendas.component.scss'
})
export class TiendasComponent {

  options: string[] = ['American Deli', 'Menestras del negro', 'Tropi Burguer', 'KFC'];

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
  ]

  filteredLocales: any[] = [...this.locales]; 

  onMarcaChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement; 
    const selectedMarca = selectElement.value; 
    if (selectedMarca) {
      this.filteredLocales = this.locales.filter(local => local.marca === selectedMarca);
    } else {
      this.filteredLocales = [...this.locales];
    }
  }
  
  companyLogo = "https://www.mediainfoline.com/wp-content/uploads/2023/08/KFC-Chicken-Bucket-Price-A-Global-Comparison.jpg"
}
