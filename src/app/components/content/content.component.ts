import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Driver {
  number: number;
  name: string;
  team: string;
  nationality: string;
  teamColor: string;
  logo?: string;
}

@Component({
  selector: 'app-content',
  imports: [FormsModule, RouterModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  searchQuery = '';

  drivers: Driver[] = [
    { number: 1, name: 'Max Verstappen', team: 'Red Bull Racing', nationality: '🇳🇱', teamColor: '#3671C6', logo: '/img/red-bull.png' },
    { number: 22, name: 'Yuki Tsunoda', team: 'Red Bull Racing', nationality: '🇯🇵', teamColor: '#3671C6', logo: '/img/red-bull.png' },
    { number: 16, name: 'Charles Leclerc', team: 'Ferrari', nationality: '🇲🇨', teamColor: '#E8002D', logo: '/img/ferrari.png' },
    { number: 44, name: 'Lewis Hamilton', team: 'Ferrari', nationality: '🇬🇧', teamColor: '#E8002D', logo: '/img/ferrari.png' },
    { number: 4, name: 'Lando Norris', team: 'McLaren', nationality: '🇬🇧', teamColor: '#FF8000', logo: '/img/mclaren.png' },
    { number: 81, name: 'Oscar Piastri', team: 'McLaren', nationality: '🇦🇺', teamColor: '#FF8000', logo: '/img/mclaren.png' },
    { number: 63, name: 'George Russell', team: 'Mercedes', nationality: '🇬🇧', teamColor: '#27F4D2', logo: '/img/Mercedes.png' },
    { number: 12, name: 'Kimi Antonelli', team: 'Mercedes', nationality: '🇮🇹', teamColor: '#27F4D2', logo: '/img/Mercedes.png' },
    { number: 14, name: 'Fernando Alonso', team: 'Aston Martin', nationality: '🇪🇸', teamColor: '#229971', logo: '/img/aston.png' },
    { number: 18, name: 'Lance Stroll', team: 'Aston Martin', nationality: '🇨🇦', teamColor: '#229971', logo: '/img/aston.png' },
    { number: 10, name: 'Pierre Gasly', team: 'Alpine', nationality: '🇫🇷', teamColor: '#0093FF', logo: '/img/alpine.png' },
    { number: 7, name: 'Jack Doohan', team: 'Alpine', nationality: '🇦🇺', teamColor: '#0093FF', logo: '/img/alpine.png' },
    { number: 23, name: 'Alexander Albon', team: 'Williams', nationality: '🇹🇭', teamColor: '#00A3E0', logo: '/img/williams.webp' },
    { number: 55, name: 'Carlos Sainz', team: 'Williams', nationality: '🇪🇸', teamColor: '#00A3E0', logo: '/img/williams.webp' },
    { number: 31, name: 'Esteban Ocon', team: 'Haas', nationality: '🇫🇷', teamColor: '#B6BABD', logo: '/img/haas.png' },
    { number: 87, name: 'Oliver Bearman', team: 'Haas', nationality: '🇬🇧', teamColor: '#B6BABD', logo: '/img/haas.png' },
    { number: 27, name: 'Nico Hülkenberg', team: 'Kick Sauber', nationality: '🇩🇪', teamColor: '#52E252', logo: '/img/sauber.webp' },
    { number: 5, name: 'Gabriel Bortoleto', team: 'Kick Sauber', nationality: '🇧🇷', teamColor: '#52E252', logo: '/img/sauber.webp' },
    { number: 30, name: 'Liam Lawson', team: 'Racing Bulls', nationality: '🇳🇿', teamColor: '#6692FF', logo: '/img/racing.png' },
    { number: 6, name: 'Isack Hadjar', team: 'Racing Bulls', nationality: '🇫🇷', teamColor: '#6692FF', logo: '/img/racing.png' },
  ];

  get filteredDrivers(): Driver[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.drivers;
    return this.drivers.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.team.toLowerCase().includes(q) ||
      d.number.toString().includes(q)
    );
  }
}
