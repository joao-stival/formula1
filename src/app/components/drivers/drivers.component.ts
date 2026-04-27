import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalDriversComponent } from "../modal-drivers/modal-drivers.component";
import { DriversService, Driver } from '../../services/drivers.service';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ModalDriversComponent],
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
})
export class DriversComponent implements OnInit {
  searchQuery = '';
  drivers: Driver[] = [];
  selectedDriver: Driver | null = null;
  modalAberto = false;
  loading = true;
  erro = '';

  constructor(private driversService: DriversService) { }

  ngOnInit(): void {
    const localDrivers = this.driversService.getDrivers();

    this.driversService.getAll().subscribe({
      next: (apiDrivers) => {
        this.drivers = apiDrivers.map(api => {
          const local = localDrivers.find(
            d => d.name.toLowerCase() === api.name.toLowerCase()
          );
          return {
            number: local?.number ?? api.id,
            name: api.name,
            team: api.team?.name ?? local?.team ?? '',
            nationality: local?.nationality ?? '',
            teamColor: api.team?.color ?? local?.teamColor ?? '#ccc',
            logo: api.team?.logo ?? local?.logo,
            foto: local?.foto ?? '',
          };
        });
        this.loading = false;
      },
      error: () => {
        // fallback para a array local se a API falhar
        this.drivers = localDrivers;
        this.loading = false;
        this.erro = 'Não foi possível carregar pilotos da API. Exibindo dados locais.';
      }
    });
  }

  get filteredDrivers(): Driver[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.drivers;
    return this.drivers.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.team.toLowerCase().includes(q) ||
      d.number.toString().includes(q)
    );
  }

  abrirModal(driver: Driver) {
    this.selectedDriver = driver;
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.selectedDriver = null;
  }
}
