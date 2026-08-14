import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card-previsao-tempo',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './card-previsao-tempo.html',
  styleUrl: './card-previsao-tempo.css',
})
export class CardPrevisaoTempo {
clima = input.required<ClimaTempo>();


adicionarFavorito(): void {
    // Lógica para adicionar a cidade aos favoritos
    console.log(`Cidade ${this.clima.name} adicionada aos favoritos!`);
  }
}
