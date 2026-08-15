import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CidadeFavoritaComTempoDto, FavoritosDto, NovoFavorito, CidadeFavorita } from '../../features/shared/models/CidadeFavorita';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private baseUrl = environment.apiUrl;
  private favoritosSubject = new BehaviorSubject<FavoritosDto | null>(null);
  favoritos$ = this.favoritosSubject.asObservable();

  constructor(private http: HttpClient) { }

  atualizarOrdem(cidades: CidadeFavoritaComTempoDto[]): void {
    const favoritos = this.favoritosSubject.value;

    if (!favoritos) {
      return;
    }

    const cidadesAtualizadas = cidades.map((cidade, index) => ({
      ...cidade,
      posicao: index + 1
    }));

    this.favoritosSubject.next({
      ...favoritos,
      cidadesFavoritas: cidadesAtualizadas
    });
  }

  atualizarFavoritos(cidades: CidadeFavorita[]) {
    const cidadesAtualizadas = cidades.map((cidade, index) => ({
      ...cidade,
      posicao: index + 1
    }));

    return this.http.put(
      `${this.baseUrl}/CidadesFavoritas/atualizar`,
      cidadesAtualizadas
    );
  }

  addFavorito(favorito: NovoFavorito) {
    return this.http.post(`${this.baseUrl}/CidadesFavoritas/adicionar`, favorito);
  }

  getFavoritos() {
    this.http.get<FavoritosDto>(`${this.baseUrl}/CidadesFavoritas/listar`).subscribe(favoritos => {
      this.favoritosSubject.next(favoritos);
    });
  }

  removeFavorito(id: number) {
    return this.http.delete(`${this.baseUrl}/CidadesFavoritas/remover`, { params: { id: id.toString() } });
  }
}
