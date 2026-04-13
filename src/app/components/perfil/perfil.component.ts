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

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private favoritesService: FavoritesService,
    private driversService: DriversService
  ) { }

  ngOnInit(): void {
    const user = this.loginService.getCurrentUser() || {};
    this.perfilForm = this.fb.group({
      nome: [user.nome || ''],
      email: [user.email || ''],
      telefone: [user.telefone || ''],
      dataNascimento: [user.dataNascimento || ''],
      pilotoFavorito: [user.pilotoFavorito || ''],
      equipesFavorita: [user.equipesFavorita || ''],
      pais: [user.pais || ''],
      cidade: [user.cidade || '']
    });
  }

  salvar(): void {
    const dadosAtualizados = this.perfilForm.value;
    this.loginService.updateUser(dadosAtualizados);

    const pilotoNumber = Number(dadosAtualizados.pilotoFavorito);
    if (pilotoNumber) {
      const driver = this.driversService.getDrivers().find(d => d.number === pilotoNumber);
      if (driver) {
        this.favoritesService.addFavorite(driver);
      }
    }

    this.mensagem = 'Alterações salvas com sucesso!';
    setTimeout(() => this.mensagem = '', 3000);
  }

  cancelar(): void {
    const user = this.loginService.getCurrentUser() || {};
    this.perfilForm.patchValue(user);
    this.mensagem = '';
  }
}
