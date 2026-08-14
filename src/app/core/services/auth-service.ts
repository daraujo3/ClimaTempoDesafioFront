import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  private loggedIn = new BehaviorSubject<boolean>(!!this.getToken());

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const payload = { Email: email, Password: password };

    // Tipamos como <any> ou criamos uma interface para a resposta do seu backend
    return this.http.post<any>(`${this.baseUrl}/Autenticacao/login`, payload).pipe(
      tap(resposta => {
        // Altere 'token' para o nome exato da propriedade que seu backend retorna
        if (resposta && resposta.token) {
          localStorage.setItem('jwt_token', resposta.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt_token'); // Limpa o token
    this.loggedIn.next(false); // Avisa a aplicação que deslogou
  }

  // Método auxiliar para recuperar o token depois
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }
}
