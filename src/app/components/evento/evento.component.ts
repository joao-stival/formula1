import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { DriversService } from '../../services/drivers.service';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.scss'
})

export class EventoComponent implements OnInit {
  corrida = {
    nome: 'Interlagos Grand Prix',
    data: '21 de Abril de 2026',
    local: 'Autódromo José Carlos Pace, São Paulo, Brasil',
  }

  DetalhesCorrida = [
    {
      nome: 'Interlagos Grand Prix',
      data: '21 de Abril de 2026',
      local: 'Autódromo José Carlos Pace, São Paulo, Brasil',
      circuito: 'Circuito de Interlagos',
      distancia: '305 km',
      voltas: 71,
      duracao: '1h 30m',
      ImagePista: '/img/interlagos.jpg',
    }
  ];

  participantes: any[] = [];

  timesUnicos: { team: string, logo: string }[] = [];
  currentSlide = 0;
  medalhaAberta: number | null = null;
  podio: { [key: number]: any } = { 1: null, 2: null, 3: null };

  constructor(private driversService: DriversService) { }

  ngOnInit(): void {
    this.participantes = this.driversService.getDrivers();
    // Garante que timesUnicos sempre terá apenas um logo por time
    this.timesUnicos = this.participantes.reduce((acc: any[], curr) => {
      if (!acc.find(t => t.team === curr.team)) {
        acc.push({ team: curr.team, logo: curr.logo });
      }
      return acc;
    }, []);
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.timesUnicos.length) % this.timesUnicos.length;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.timesUnicos.length;
  }

  abrirSelect(posicao: number): void {
    this.medalhaAberta = this.medalhaAberta === posicao ? null : posicao;
  }

  selecionarPiloto(posicao: number, piloto: any, event: Event): void {
    event.stopPropagation();
    this.podio[posicao] = piloto;
    this.medalhaAberta = null;
  }

  limparPodio(posicao: number, event: Event): void {
    event.stopPropagation();
    this.podio[posicao] = null;
  }

  pilotoJaSelecionado(piloto: any): boolean {
    return Object.values(this.podio).some(p => p?.name === piloto.name);
  }

  getPilotosDisponiveis(): any[] {
    return this.participantes.filter(p => !this.pilotoJaSelecionado(p));
  }
}
