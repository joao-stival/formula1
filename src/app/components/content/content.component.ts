import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalDriversComponent } from "../modal-drivers/modal-drivers.component";
import { DriversService, Driver } from '../../services/drivers.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ModalDriversComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  searchQuery = '';
  drivers: Driver[] = [];
  selectedDriver: Driver | null = null;
  modalAberto = false;

  constructor(private driversService: DriversService) {
    this.drivers = this.driversService.getDrivers();
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
