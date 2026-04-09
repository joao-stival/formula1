import { Injectable } from '@angular/core';

export interface Driver {
  number: number;
  name: string;
  team: string;
  nationality: string;
  teamColor: string;
  logo?: string;
  foto: string;
}

@Injectable({
  providedIn: 'root'
})
export class DriversService {
  private drivers: Driver[] = [
    { number: 1, name: 'Max Verstappen', team: 'Red Bull Racing', nationality: '🇳🇱', teamColor: '#3671C6', logo: 'logos/red-bull.png', foto: 'drivers/verstappen.png' },
    { number: 22, name: 'Yuki Tsunoda', team: 'Red Bull Racing', nationality: '🇯🇵', teamColor: '#3671C6', logo: 'logos/red-bull.png', foto: 'drivers/tsunoda.png' },
    { number: 16, name: 'Charles Leclerc', team: 'Ferrari', nationality: '🇲🇨', teamColor: '#E8002D', logo: 'logos/ferrari.png', foto: 'drivers/leclerc.png' },
    { number: 44, name: 'Lewis Hamilton', team: 'Ferrari', nationality: '🇬🇧', teamColor: '#E8002D', logo: 'logos/ferrari.png', foto: 'drivers/hamilton.png' },
    { number: 4, name: 'Lando Norris', team: 'McLaren', nationality: '🇬🇧', teamColor: '#FF8000', logo: 'logos/mclaren.png', foto: 'drivers/norris.png' },
    { number: 81, name: 'Oscar Piastri', team: 'McLaren', nationality: '🇦🇺', teamColor: '#FF8000', logo: 'logos/mclaren.png', foto: 'drivers/piastri.png' },
    { number: 63, name: 'George Russell', team: 'Mercedes', nationality: '🇬🇧', teamColor: '#27F4D2', logo: 'logos/Mercedes.png', foto: 'drivers/russel.png' },
    { number: 12, name: 'Kimi Antonelli', team: 'Mercedes', nationality: '🇮🇹', teamColor: '#27F4D2', logo: 'logos/Mercedes.png', foto: 'drivers/antonelli.png' },
    { number: 14, name: 'Fernando Alonso', team: 'Aston Martin', nationality: '🇪🇸', teamColor: '#229971', logo: 'logos/aston.png', foto: 'drivers/alonso.png' },
    { number: 18, name: 'Lance Stroll', team: 'Aston Martin', nationality: '🇨🇦', teamColor: '#229971', logo: 'logos/aston.png', foto: 'drivers/stroll.png' },
    { number: 10, name: 'Pierre Gasly', team: 'Alpine', nationality: '🇫🇷', teamColor: '#0093FF', logo: 'logos/alpinelogo2.png', foto: 'drivers/gasly.png' },
    { number: 7, name: 'Jack Doohan', team: 'Alpine', nationality: '🇦🇺', teamColor: '#0093FF', logo: 'logos/alpinelogo2.png', foto: 'drivers/doohan.png' },
    { number: 23, name: 'Alexander Albon', team: 'Williams', nationality: '🇹🇭', teamColor: '#00A3E0', logo: 'logos/williams.webp', foto: 'drivers/albon.png' },
    { number: 55, name: 'Carlos Sainz', team: 'Williams', nationality: '🇪🇸', teamColor: '#00A3E0', logo: 'logos/williams.webp', foto: 'drivers/sains.png' },
    { number: 31, name: 'Esteban Ocon', team: 'Haas', nationality: '🇫🇷', teamColor: '#B6BABD', logo: 'logos/haas.png', foto: 'drivers/ocon.png' },
    { number: 87, name: 'Oliver Bearman', team: 'Haas', nationality: '🇬🇧', teamColor: '#B6BABD', logo: 'logos/haas.png', foto: 'drivers/bearman.png' },
    { number: 27, name: 'Nico Hülkenberg', team: 'Kick Sauber', nationality: '🇩🇪', teamColor: '#52E252', logo: 'logos/sauber.webp', foto: 'drivers/hulkenberg.png' },
    { number: 5, name: 'Gabriel Bortoleto', team: 'Kick Sauber', nationality: '🇧🇷', teamColor: '#52E252', logo: 'logos/sauber.webp', foto: 'drivers/bortoleto.png' },
    { number: 30, name: 'Liam Lawson', team: 'Racing Bulls', nationality: '🇳🇿', teamColor: '#6692FF', logo: 'logos/racing.png', foto: 'drivers/lawson.png' },
    { number: 6, name: 'Isack Hadjar', team: 'Racing Bulls', nationality: '🇫🇷', teamColor: '#6692FF', logo: 'logos/racing.png', foto: 'drivers/hadjar.png' },
  ];

  constructor() { }

  getDrivers(): Driver[] {
    return this.drivers;
  }
}
