import { Injectable } from '@angular/core';
import { FavoritesService } from './favorites.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    users = [
        { email: 'joao@gmail.com', senha: '102030a' },
        { email: 'maria@gmail.com', senha: '102030b' },
        { email: 'pedro@gmail.com', senha: '102030d' }
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
    this.users.push({ email: user.email, senha: user.senha });
    return { sucesso: true, mensagem: 'Cadastro realizado com sucesso!' };
  }


    login(email: string, password: string): any {
        const user = this.users.find((u) => u.email === email && u.senha === password);
        if (user) {
            console.log(`Login bem-sucedido para ${email}`);
            const token = this.generateToken();
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
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
}
