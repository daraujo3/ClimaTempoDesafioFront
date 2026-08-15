import { Component, inject, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, moveItemInArray, CdkDropList } from '@angular/cdk/drag-drop';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CardPrevisaoTempo } from '../card-previsao-tempo/card-previsao-tempo';
import { FormsModule } from '@angular/forms';
import { FavoritosService } from '../../core/services/favoritos-service';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-favoritos',
  imports: [FormsModule,
    CdkDrag,
    CdkDropList,
    CardPrevisaoTempo,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos implements OnInit {
  private favoritosService = inject(FavoritosService);

  get favoritos$() {
    return this.favoritosService.favoritos$;
  }

  ngOnInit(): void {
    this.carregarFavoritos();
  }

  private carregarFavoritos(): void {
    this.favoritosService.getFavoritos();
  }

  drop(event: CdkDragDrop<string[]>): void {
    this.favoritos$.pipe(take(1)).subscribe(favoritos => {

      if (!favoritos) {
        return;
      }

      moveItemInArray(
        favoritos.cidadesFavoritas,
        event.previousIndex,
        event.currentIndex
      );

    });
  }
}
