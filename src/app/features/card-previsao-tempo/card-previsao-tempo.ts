import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FavoritosService } from '../../core/services/favoritos-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CidadeFavoritaComTempoDto } from '../shared/models/CidadeFavorita';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { FavoritosLocalService } from '../../core/services/favoritos-local-service';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-card-previsao-tempo',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    DatePipe,
    DecimalPipe,
    MatMenuModule
  ],
  templateUrl: './card-previsao-tempo.html',
  styleUrl: './card-previsao-tempo.css',
})
export class CardPrevisaoTempo {
  private favoritoService = inject(FavoritosService);
  private favoritoLocalService = inject(FavoritosLocalService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  favorito = input.required<boolean>();
  hoverFavorito = false;
  isExpanded = false;
  clima = input.required<CidadeFavoritaComTempoDto>();

  adicionarRemoverFavorito(): void {
    if (this.favorito()) {
      this.removeFavorito();
    } else {
      this.addFavorito();
    }
  }

  @Output()
  expandedChange = new EventEmitter<boolean>();

  onOpened() {
    this.isExpanded = true;
    this.expandedChange.emit(this.isExpanded);
  }

  onClosed() {
    this.isExpanded = false;
    this.expandedChange.emit(this.isExpanded);
  }

  addFavorito(): void {

    if (!this.authService.isLoggedIn) {
      this.favoritoLocalService.adicionar({
        name: this.clima().name,
        region: this.clima().region,
        country: this.clima().country
      });
      let snackBarRef = this.snackBar.open('Favorito adicionado local, entre no sistema para sincronizar dados!', 'Fechar', {
        duration: 5000,
      });
    } else {
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

