import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    users: User[] = [];
    loading = false;
    togglingId: number | null = null;
    mensagem = '';
    tipoMensagem: 'sucesso' | 'erro' = 'sucesso';

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.carregarUsuarios();
    }

    carregarUsuarios(): void {
        this.loading = true;
        this.userService.getAll().subscribe({
            next: (data: User[]) => {
                this.users = data;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.mostrarMensagem('Erro ao carregar usuários.', 'erro');
            }
        });
    }

    toggleAdmin(user: User): void {
        if (!user.id) return;
        this.togglingId = user.id;

        this.userService.toggleAdmin(user.id).subscribe({
            next: (res) => {
                user.admin = res.admin;
                this.togglingId = null;
                this.mostrarMensagem(
                    `${user.name} agora ${res.admin ? 'é' : 'não é mais'} admin.`,
                    'sucesso'
                );
            },
            error: (err) => {
                this.togglingId = null;
                this.mostrarMensagem(err.error?.message || 'Erro ao alterar permissão.', 'erro');
            }
        });
    }

    private mostrarMensagem(msg: string, tipo: 'sucesso' | 'erro'): void {
        this.mensagem = msg;
        this.tipoMensagem = tipo;
        setTimeout(() => this.mensagem = '', 3500);
    }
}
