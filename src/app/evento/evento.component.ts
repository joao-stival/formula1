import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
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

  participantes = [
    { number: 1, name: 'Max Verstappen', team: 'Red Bull Racing', nationality: '🇳🇱', teamColor: '#3671C6', logo: '/img/red-bull.png', foto: '/img/verstappen.webp' },
    { number: 22, name: 'Yuki Tsunoda', team: 'Red Bull Racing', nationality: '🇯🇵', teamColor: '#3671C6', logo: '/img/red-bull.png', foto: '/img/tsunoda.webp' },
    { number: 16, name: 'Charles Leclerc', team: 'Ferrari', nationality: '🇲🇨', teamColor: '#E8002D', logo: '/img/ferrari.png', foto: '/img/leclerc.webp' },
    { number: 44, name: 'Lewis Hamilton', team: 'Ferrari', nationality: '🇬🇧', teamColor: '#E8002D', logo: '/img/ferrari.png', foto: '/img/hamilton.webp' },
    { number: 4, name: 'Lando Norris', team: 'McLaren', nationality: '🇬🇧', teamColor: '#FF8000', logo: '/img/mclaren.png', foto: '/img/norris.webp' },
    { number: 81, name: 'Oscar Piastri', team: 'McLaren', nationality: '🇦🇺', teamColor: '#FF8000', logo: '/img/mclaren.png', foto: '/img/piastri.webp' },
    { number: 63, name: 'George Russell', team: 'Mercedes', nationality: '🇬🇧', teamColor: '#27F4D2', logo: '/img/Mercedes.png', foto: '/img/russel.webp' },
    { number: 12, name: 'Kimi Antonelli', team: 'Mercedes', nationality: '🇮🇹', teamColor: '#27F4D2', logo: '/img/Mercedes.png', foto: '/img/antonelli.webp' },
    { number: 14, name: 'Fernando Alonso', team: 'Aston Martin', nationality: '🇪🇸', teamColor: '#229971', logo: '/img/aston.png', foto: '/img/alonso.webp' },
    { number: 18, name: 'Lance Stroll', team: 'Aston Martin', nationality: '🇨🇦', teamColor: '#229971', logo: '/img/aston.png', foto: '/img/stroll.webp' },
    { number: 10, name: 'Pierre Gasly', team: 'Alpine', nationality: '🇫🇷', teamColor: '#0093FF', logo: '/img/alpine.png', foto: '/img/gasly.webp' },
    { number: 7, name: 'Jack Doohan', team: 'Alpine', nationality: '🇦🇺', teamColor: '#0093FF', logo: '/img/alpine.png', foto: '/img/doohan.webp' },
    { number: 23, name: 'Alexander Albon', team: 'Williams', nationality: '🇹🇭', teamColor: '#00A3E0', logo: '/img/williams.webp', foto: '/img/albon.webp' },
    { number: 55, name: 'Carlos Sainz', team: 'Williams', nationality: '🇪🇸', teamColor: '#00A3E0', logo: '/img/williams.webp', foto: '/img/sains.webp' },
    { number: 31, name: 'Esteban Ocon', team: 'Haas', nationality: '🇫🇷', teamColor: '#B6BABD', logo: '/img/haas.png', foto: '/img/ocon.webp' },
    { number: 87, name: 'Oliver Bearman', team: 'Haas', nationality: '🇬🇧', teamColor: '#B6BABD', logo: '/img/haas.png', foto: '/img/bearman.webp' },
    { number: 27, name: 'Nico Hülkenberg', team: 'Kick Sauber', nationality: '🇩🇪', teamColor: '#52E252', logo: '/img/sauber.webp', foto: '/img/Hulkenberg.webp' },
    { number: 5, name: 'Gabriel Bortoleto', team: 'Kick Sauber', nationality: '🇧🇷', teamColor: '#52E252', logo: '/img/sauber.webp', foto: '/img/bortoleto.webp' },
    { number: 30, name: 'Liam Lawson', team: 'Racing Bulls', nationality: '🇳🇿', teamColor: '#6692FF', logo: '/img/racing.png', foto: '/img/lawson.webp' },
    { number: 6, name: 'Isack Hadjar', team: 'Racing Bulls', nationality: '🇫🇷', teamColor: '#6692FF', logo: '/img/racing.png', foto: '/img/hadjar.webp' },
  ];

  timesUnicos: { team: string, logo: string }[] = [];
  currentSlide = 0;
  medalhaAberta: number | null = null;
  podio: { [key: number]: { name: string, foto: string } | null } = { 1: null, 2: null, 3: null };

  ngOnInit(): void {
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

  selecionarPiloto(posicao: number, piloto: { name: string, foto: string }): void {
    this.podio[posicao] = piloto;
    this.medalhaAberta = null;
  }

  pilotoJaSelecionado(piloto: { name: string, foto: string }): boolean {
    return Object.values(this.podio).some(p => p?.name === piloto.name);
  }

  getPilotosDisponiveis(): any[] {
    return this.participantes.filter(p => !this.pilotoJaSelecionado(p));
  }
}
