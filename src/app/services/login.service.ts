import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FavoritesService } from './favorites.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private userSubject = new BehaviorSubject<any>(null);
    public user$: Observable<any> = this.userSubject.asObservable();

    users = [
        { email: 'joao@gmail.com', senha: '102030a', equipesFavorita: 'Ferrari' },
        { email: 'maria@gmail.com', senha: '102030b', equipesFavorita: 'Red Bull Racing' },
        { email: 'pedro@gmail.com', senha: '102030d', equipesFavorita: 'McLaren' }
    ];

    constructor(private favoritesService: FavoritesService) { }

    private generateToken(): string {
        return 'token_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    validarUser(email: string, senha: string): boolean {
        return this.users.some(user => user.email === email && user.senha === senha);
    }

    cadastrar(user: any): { sucesso: boolean; mensagem: string } {
        const emailExistente = this.users.some(u => u.email === user.email);
        if (emailExistente) {
            return { sucesso: false, mensagem: 'E-mail já cadastrado.' };
        }
        this.users.push({
            email: user.email,
            senha: user.senha,
            nome: user.nome || '',
            dataNascimento: user.dataNascimento || '',
            pilotoFavorito: user.pilotoFavorito || '',
            equipesFavorita: user.equipesFavorita || '',
            telefone: user.telefone || '',
            pais: user.pais || '',
            cidade: user.cidade || ''
        } as any);
        console.log('Usuário cadastrado:', {
            email: user.email,
            senha: user.senha,
        } as any);
        return { sucesso: true, mensagem: 'Cadastro realizado com sucesso!' };
    }


    login(email: string, password: string): any {
        const user = this.users.find((u) => u.email === email && u.senha === password);
        if (user) {
            console.log(`Login bem-sucedido para ${email}`);
            const token = this.generateToken();
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            this.favoritesService.setCurrentUser(email);
            return user;
        } else {
            console.log('Login falhou: email ou senha incorretos');
            return null;
        }
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.favoritesService.logout();
    }

    getCurrentUser(): any {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    updateUser(dados: any): void {
        const user = this.getCurrentUser();
        if (!user) return;
        const atualizado = { ...user, ...dados };
        localStorage.setItem('user', JSON.stringify(atualizado));
        console.log('✅ Usuário atualizado no localStorage:', atualizado);
        this.userSubject.next(atualizado);
        const idx = this.users.findIndex(u => u.email === user.email);
        if (idx !== -1) {
            this.users[idx] = { ...this.users[idx], ...dados };
        }
    }
}
