import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TiendasComponent } from "./tiendas/tiendas.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TiendasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'replica_v2';
}
