import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';

interface DestacadoDriver {
    number: number;
    name: string;
    team: string;
    nationality: string;
    teamColor: string;
    points: number;
}

interface Race {
    round: number;
    name: string;
    circuit: string;
    country: string;
    flag: string;
    winner: string;
    team: string;
    date: string;
}

interface Team {
    name: string;
    color: string;
    points: number;
    logo: string;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    users: any = [];

    constructor(private router: Router, private userService: UserService) { }

    ngOnInit(): void {
    }

    listarPilotosDestaque(): DestacadoDriver[] {
        return [
            { number: 1, name: 'Max Verstappen', team: 'Red Bull Racing', nationality: '🇳🇱', teamColor: '#3671C6', points: 77 },
            { number: 16, name: 'Charles Leclerc', team: 'Ferrari', nationality: '🇲🇨', teamColor: '#E8002D', points: 69 },
            { number: 4, name: 'Lando Norris', team: 'McLaren', nationality: '🇬🇧', teamColor: '#FF8000', points: 64 },
        ];
    }

    obterUltimaCorrida(): Race {
        return {
            round: 5,
            name: 'Grande Prêmio da China',
            circuit: 'Circuito Internacional de Xangai',
            country: 'China',
            flag: '🇨🇳',
            winner: 'Max Verstappen',
            team: 'Red Bull Racing',
            date: '23 de Março de 2025',
        };
    }

    obterProximasCorridas(): Race[] {
        return [
            { round: 6, name: 'GP do Japão', circuit: 'Suzuka', country: 'Japão', flag: '🇯🇵', winner: '-', team: '-', date: '06 Abr 2025' },
            { round: 7, name: 'GP do Bahrein', circuit: 'Sakhir', country: 'Bahrein', flag: '🇧🇭', winner: '-', team: '-', date: '13 Abr 2025' },
            { round: 8, name: 'GP da Arábia Saudita', circuit: 'Jeddah', country: 'Arábia Saudita', flag: '🇸🇦', winner: '-', team: '-', date: '20 Abr 2025' },
        ];
    }

    obterEquipes(): Team[] {
        return [
            { name: 'Red Bull Racing', color: '#3671C6', points: 146, logo: 'logos/red-bull.png' },
            { name: 'Ferrari', color: '#E8002D', points: 131, logo: 'logos/ferrari.png' },
            { name: 'McLaren', color: '#FF8000', points: 121, logo: 'logos/mclaren.png' },
            { name: 'Mercedes', color: '#27F4D2', points: 88, logo: 'logos/Mercedes.png' },
        ];
    }

    irParaPilotos(): void {
        this.router.navigate(['/content']);
    }

    readonly pilotos = this.listarPilotosDestaque();
    readonly ultimaCorrida = this.obterUltimaCorrida();
    readonly proximasCorridas = this.obterProximasCorridas();
    readonly equipes = this.obterEquipes();
}
