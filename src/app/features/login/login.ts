import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth-service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FavoritosLocalService } from '../../core/services/favoritos-local-service';
import { FavoritosService } from '../../core/services/favoritos-service';
import { NovoFavorito } from '../shared/models/CidadeFavorita';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private favoritosLocalService = inject(FavoritosLocalService);
  private favoritosService = inject(FavoritosService);
  private snackBar = inject(MatSnackBar);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required]
  });

  constructor(private router: Router) { }

  logar() {
    if (this.form.invalid) {
      return;
    }

    const email = this.form.get('email')?.value;
    const senha = this.form.get('senha')?.value;

    if (!email || !senha) {
      return;
    }

    this.authService.login(email, senha).subscribe({
      next: (response) => {
        const favoritos = this.favoritosLocalService.getFavoritos<NovoFavorito>();

        if (favoritos?.length) {

          forkJoin(
            favoritos.map(favorito =>
              this.favoritosService.addFavorito(favorito)
            )
          ).subscribe({
            next: resultados => {
              this.snackBar.open('Login bem-sucedido, favoritos sincronizados', 'Fechar', {
                duration: 5000,
              });
            },
            error: erro => {
            }
          });
        } else {
          let snackBarRef = this.snackBar.open('Login bem-sucedido!', 'Fechar', {
            duration: 5000,
          });
        }

        this.router.navigate(['/favoritos']);
      },
      error: (error) => {
        let snackBarRef = this.snackBar.open('Erro ao logar! ' + (error.error?.message || ''), 'Fechar', {
          duration: 5000,
        });
      }
    });
  }
}
