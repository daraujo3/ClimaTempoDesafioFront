import { Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FavoritosService } from '../../core/services/favoritos-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CidadeFavoritaComTempoDto } from '../shared/models/CidadeFavorita';

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
  private favoritoService = inject(FavoritosService);
  private snackBar = inject(MatSnackBar);
  favorito = input.required<boolean>();
  hoverFavorito = false;
  clima = input.required<CidadeFavoritaComTempoDto>();

  adicionarRemoverFavorito(): void {
    if (this.favorito()) {
      this.removeFavorito();
    } else {
      this.addFavorito();
    }
  }

  addFavorito(): void {
    this.favoritoService.addFavorito({
      name: this.clima().name,
      region: this.clima().region,
      country: this.clima().country
    }).subscribe({
      next: (response) => {
        let snackBarRef = this.snackBar.open('Favorito adicionado com sucesso!', 'Fechar', {
          duration: 5000,
        });
      },
      error: (error) => {
        let snackBarRef = this.snackBar.open('Erro: ' + (error.error?.message || ''), 'Fechar', {
          duration: 5000,
        });
      }
    });
  }

  removeFavorito(): void {
    this.favoritoService.removeFavorito(this.clima().id).subscribe({
      next: (response) => {
        let snackBarRef = this.snackBar.open('Favorito removido com sucesso!', 'Fechar', {
          duration: 5000,
        });
      },
      error: (error) => {
        let snackBarRef = this.snackBar.open('Erro: ' + (error.error?.message || ''), 'Fechar', {
          duration: 5000,
        });
      },
      complete: () => {
        this.favoritoService.getFavoritos();
      }
    });
  }
}

