import { Component, signal } from '@angular/core';
import { ClimaTempoService } from '../../core/services/clima-tempo-service';
import { FormsModule } from '@angular/forms';
import { CardPrevisaoTempo } from '../card-previsao-tempo/card-previsao-tempo';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    CardPrevisaoTempo,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  searchQuery = '';
  loading = false;
  errorMessage = '';

  constructor(
    private climaTempoService: ClimaTempoService
  ) { }

  get clima$() {
    return this.climaTempoService.clima$;
  }

  buscarCidade(): void {

    if (!this.searchQuery.trim()) {
      return;
    }

    this.climaTempoService.buscaPrevisao(this.searchQuery.trim());
  }
}
