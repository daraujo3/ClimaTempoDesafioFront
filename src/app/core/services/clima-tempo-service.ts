import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ClimaTempoService {
  private baseUrl = environment.apiUrl;
  private climaSubject = new BehaviorSubject<ClimaTempo | null>(null);
  clima$ = this.climaSubject.asObservable();

  constructor(private http: HttpClient) { }

  buscaPrevisao(cidade: string) {
    this.http.get<ClimaTempo>(`${this.baseUrl}/PrevisaoTempo`, { params: { cidade } }).subscribe(clima => {
      this.climaSubject.next(clima);
    });
    // return this.http.get<ClimaTempo>(
    //   `${this.baseUrl}/PrevisaoTempo`,
    //   {
    //     params: {
    //       cidade: cidade
    //     }
    //   }
    // );
  }
}
