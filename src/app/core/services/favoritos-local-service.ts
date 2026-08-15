import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CidadeFavoritaComTempoDto, FavoritosDto, NovoFavorito, CidadeFavorita } from '../../features/shared/models/CidadeFavorita';

@Injectable({
  providedIn: 'root'
})
export class FavoritosLocalService {
  private readonly STORAGE_KEY = 'favoritos';

  getFavoritos<NovoFavorito>(): NovoFavorito[] {
    const favoritos = localStorage.getItem(this.STORAGE_KEY);

    if (!favoritos) {
      return [];
    }

    try {
      return JSON.parse(favoritos);
    } catch {
      return [];
    }
  }

  salvarFavoritos<NovoFavorito>(favoritos: NovoFavorito[]): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(favoritos)
    );
  }

  adicionar<NovoFavorito>(favorito: NovoFavorito): void {
    const favoritos = this.getFavoritos<NovoFavorito>();

    favoritos.push(favorito);

    this.salvarFavoritos(favoritos);
  }

  remover(favorito: NovoFavorito): void {
    const favoritos = this.getFavoritos<NovoFavorito>();

    const novosFavoritos = favoritos.filter(
      favorito => favorito.country != favorito.country && favorito.name != favorito.name && favorito.region != favorito.region
    );

    this.salvarFavoritos(novosFavoritos);
  }

  limpar(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
