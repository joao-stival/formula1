import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { FavoritesService } from '../../services/favorites.service';
import { DriversService } from '../../services/drivers.service';
import { CountrySelectComponent } from '../country-select/country-select.component';

@Component({
  selector: 'app-perfil',
  imports: [ReactiveFormsModule, CountrySelectComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  perfilForm!: FormGroup;
  mensagem: string = '';
  erro: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private favoritesService: FavoritesService,
    private driversService: DriversService
  ) { }

  private toDateInput(value: string): string {
    if (!value) return '';
    return value.split('T')[0];
  }

  ngOnInit(): void {
    // Inicializa o form com dados do localStorage enquanto carrega a API
    const localUser = this.loginService.getCurrentUser() || {};
    this.perfilForm = this.fb.group({
      nome: [localUser.name || localUser.nome || ''],
      email: [localUser.email || ''],
      telefone: [localUser.phone || localUser.telefone || ''],
      dataNascimento: [this.toDateInput(localUser.birth || localUser.dataNascimento || '')],

      pilotoFavorito: [localUser.favorite_pilot ?? localUser.pilotoFavorito ?? ''],
      equipesFavorita: [localUser.favorite_team || localUser.equipesFavorita || ''],
      pais: [localUser.adresses?.[0]?.country || localUser.pais || ''],
      cidade: [localUser.adresses?.[0]?.city || localUser.cidade || '']
    });

    // Carrega dados atualizados da API
    this.loginService.getMe().subscribe({
      next: (user: any) => {
        this.perfilForm.patchValue({
          nome: user.name || '',
          email: user.email || '',
          telefone: user.phone || '',
          dataNascimento: this.toDateInput(user.birth || ''),
          pilotoFavorito: user.favorite_pilot ?? '',
          equipesFavorita: user.favorite_team || '',
          pais: user.adresses?.[0]?.country || '',
          cidade: user.adresses?.[0]?.city || ''
        });
      },
      error: () => { }
    });
  }

  salvar(): void {
    const form = this.perfilForm.value;

    const payload: any = {
      name: form.nome,
      email: form.email,
      phone: form.telefone,
      birth: form.dataNascimento,
      country: form.pais,
      city: form.cidade,
    };

    if (form.pilotoFavorito !== '' && form.pilotoFavorito !== null) {
      payload.favorite_pilot = Number(form.pilotoFavorito);
    } else {
      payload.favorite_pilot = null;
    }

    if (form.equipesFavorita) {
      payload.favorite_team = form.equipesFavorita;
    } else {
      payload.favorite_team = null;
    }

    this.erro = '';
    this.loginService.updateProfileApi(payload).subscribe({
      next: () => {
        // Atualiza favorito local se piloto selecionado
        const pilotoNumber = Number(form.pilotoFavorito);
        if (pilotoNumber) {
          const driver = this.driversService.getDrivers().find(d => d.number === pilotoNumber);
          if (driver) {
            this.favoritesService.addFavorite(driver);
          }

        }
        this.mensagem = 'Alterações salvas com sucesso!';
        setTimeout(() => this.mensagem = '', 3000);
      },
      error: (err: any) => {
        this.erro = err?.error?.message || 'Erro ao salvar. Tente novamente.';
        setTimeout(() => this.erro = '', 4000);
      }
    });
  }

  cancelar(): void {
    this.loginService.getMe().subscribe({
      next: (user: any) => {
        this.perfilForm.patchValue({
          nome: user.name || '',
          email: user.email || '',
          telefone: user.phone || '',
          dataNascimento: this.toDateInput(user.birth || ''),
          pilotoFavorito: user.favorite_pilot ?? '',
          equipesFavorita: user.favorite_team || '',
          pais: user.adresses?.[0]?.country || '',
          cidade: user.adresses?.[0]?.city || ''
        });
      },
      error: () => {
        const user = this.loginService.getCurrentUser() || {};
        this.perfilForm.patchValue({
          nome: user.name || '',
          email: user.email || '',
          telefone: user.phone || '',
          dataNascimento: this.toDateInput(user.birth || ''),
          pilotoFavorito: user.favorite_pilot ?? '',
          equipesFavorita: user.favorite_team || '',
          pais: user.adresses?.[0]?.country || '',
          cidade: user.adresses?.[0]?.city || ''
        });
      }
    });
    this.mensagem = '';
    this.erro = '';
  }
}

