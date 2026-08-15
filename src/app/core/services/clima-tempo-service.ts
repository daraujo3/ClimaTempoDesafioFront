import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CidadeFavoritaComTempoDto } from '../../features/shared/models/CidadeFavorita';

@Injectable({
  providedIn: 'root'
})
export class ClimaTempoService {
  private baseUrl = environment.apiUrl;
  private climaSubject = new BehaviorSubject<CidadeFavoritaComTempoDto | null>(null);
  clima$ = this.climaSubject.asObservable();

  constructor(private http: HttpClient) { }

  buscaPrevisao(cidade: string) {
    this.http.get<CidadeFavoritaComTempoDto>(`${this.baseUrl}/PrevisaoTempo`, { params: { cidade } }).subscribe(clima => {
      this.climaSubject.next(clima);
    });
  }
}
