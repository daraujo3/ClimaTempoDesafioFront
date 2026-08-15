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
import { CidadeFavorita, CidadeFavoritaComTempoDto } from '../shared/models/CidadeFavorita';

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

  onCardExpanded(id: number, expanded: boolean) {
  console.log(`Card ${id} expanded: ${expanded}`);

    this.favoritos$.pipe(take(1)).subscribe(favoritos => {
      if (!favoritos) {
        return;
      }

      const cidadesAtualizadas = favoritos.cidadesFavoritas.map(cidade => {
        if (cidade.id === id) {
          return { ...cidade, isExpanded: expanded };
        }
        return cidade;
      });

      const cidadesParaSalvar: CidadeFavorita[] =
        cidadesAtualizadas.map(cidade =>
          this.converterParaCidadeFavorita(cidade)
        );

      this.atualizarFavoritos(cidadesParaSalvar);
    });
  }

  moverFavorito(event: CdkDragDrop<CidadeFavoritaComTempoDto[]>) {
    if (event.previousIndex === event.currentIndex) {
      return;
    }

    this.favoritos$.pipe(take(1)).subscribe(favoritos => {
      if (!favoritos) {
        return;
      }

      const cidades = [...favoritos.cidadesFavoritas];

      moveItemInArray(
        cidades,
        event.previousIndex,
        event.currentIndex
      );

      const cidadesAtualizadas = cidades.map((cidade, index) => ({
        ...cidade,
        posicao: index + 1
      }));

      // Atualiza a tela
      this.favoritosService.atualizarOrdem(cidadesAtualizadas);

      // Converte para o objeto que a API espera
      const cidadesParaSalvar: CidadeFavorita[] =
        cidadesAtualizadas.map(cidade =>
          this.converterParaCidadeFavorita(cidade)
        );

      this.atualizarFavoritos(cidadesParaSalvar);
    });
  }

  private atualizarFavoritos(cidades: CidadeFavorita[]) {
    // Salva
    this.favoritosService
      .atualizarFavoritos(cidades)
      .subscribe({
        next: () => {
          console.log('Ordem salva');
        },
        error: erro => {
          console.error('Erro ao salvar ordem', erro);
          this.favoritosService.getFavoritos();
        },
        complete: () => {
          this.favoritosService.getFavoritos();
        }
      });
  }


  private converterParaCidadeFavorita(
    cidade: CidadeFavoritaComTempoDto
  ): CidadeFavorita {
    return {
      id: cidade.id,
      name: cidade.name,
      region: cidade.region,
      country: cidade.country,
      posicao: cidade.posicao,
      isExpanded: cidade.isExpanded
    };
  }
}
