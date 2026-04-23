import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface LoginResponse {
    access_token: string;
    token_type: string;
    user: any;
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private apiUrl = 'http://localhost:8000/api';

    // O BehaviorSubject permite que o Header e outros componentes 
    // "escutem" quando o usuário loga ou desloga em tempo real.
    private userSubject = new BehaviorSubject<any>(this.getUserFromStorage());
    public user$ = this.userSubject.asObservable();

    private jwtHelper = new JwtHelperService();

    constructor(private http: HttpClient, private router: Router) { }

    login(credentials: any): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                if (response.access_token) {
                    localStorage.setItem('token', response.access_token);
                    localStorage.setItem('user', JSON.stringify(response.user));

                    // Notifica todo o app que o usuário logou
                    this.userSubject.next(response.user);
                }
            })
        );
    }

    // Resolve o erro: Property 'getCurrentUser' does not exist
    getCurrentUser() {
        return this.userSubject.value;
    }

    // Resolve o erro: Property 'updateUser' does not exist
    // Usado na tela de perfil para atualizar os dados localmente
    updateUser(userData: any) {
        localStorage.setItem('user', JSON.stringify(userData));
        this.userSubject.next(userData);
    }

    logout(): void {
        this.http.post(`${this.apiUrl}/logout`, {}).pipe(
            finalize(() => {
                // Limpa a sessão local independentemente da resposta da API
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.userSubject.next(null);
                this.router.navigate(['/login']);
            })
        ).subscribe({
            error: () => { /* finalize já cuida da limpeza */ }
        });
    }

    isLoggedIn(): boolean {
        const token = localStorage.getItem('token');
        if (!token) return false;
        return !this.isTokenExpired(token);
    }

    isTokenExpired(token: string): boolean {
        return this.jwtHelper.isTokenExpired(token);
    }

    private getUserFromStorage() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}