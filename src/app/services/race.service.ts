import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Race {
    id?: number;
    name: string;
    circuit: string;
    country: string;
    city: string;
    round: number;
    laps: number;
    date: string;
    image?: string;
}

export const F1_RACES_2025: Omit<Race, 'id'>[] = [
    { round: 1, name: 'Grande Prêmio do Bahrein', circuit: 'Circuito Internacional do Bahrein', country: 'BH', city: 'Sakhir', laps: 57, date: '2025-03-02', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Bahrain_International_Circuit--Grand_Prix_layout.svg/320px-Bahrain_International_Circuit--Grand_Prix_layout.svg.png' },
    { round: 2, name: 'Grande Prêmio da Arábia Saudita', circuit: 'Circuito de Jeddah', country: 'SA', city: 'Jeddah', laps: 50, date: '2025-03-09', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Jeddah_Street_Circuit.svg/320px-Jeddah_Street_Circuit.svg.png' },
    { round: 3, name: 'Grande Prêmio da Austrália', circuit: 'Circuito de Albert Park', country: 'AU', city: 'Melbourne', laps: 58, date: '2025-03-16', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Albert_Park_circuit_2021.svg/320px-Albert_Park_circuit_2021.svg.png' },
    { round: 4, name: 'Grande Prêmio do Japão', circuit: 'Circuito de Suzuka', country: 'JP', city: 'Suzuka', laps: 53, date: '2025-04-06', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Suzuka_circuit_map.svg/320px-Suzuka_circuit_map.svg.png' },
    { round: 5, name: 'Grande Prêmio da China', circuit: 'Circuito Internacional de Xangai', country: 'CN', city: 'Xangai', laps: 56, date: '2025-04-20', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Shanghai_International_Circuit_track_map.svg/320px-Shanghai_International_Circuit_track_map.svg.png' },
    { round: 6, name: 'Grande Prêmio de Miami', circuit: 'Autódromo Internacional de Miami', country: 'US', city: 'Miami', laps: 57, date: '2025-05-04', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Miami_International_Autodrome_track_map.svg/320px-Miami_International_Autodrome_track_map.svg.png' },
    { round: 7, name: 'Grande Prêmio da Emília-Romanha', circuit: 'Autódromo Enzo e Dino Ferrari', country: 'IT', city: 'Ímola', laps: 63, date: '2025-05-18', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Autodromo_Enzo_e_Dino_Ferrari.svg/320px-Autodromo_Enzo_e_Dino_Ferrari.svg.png' },
    { round: 8, name: 'Grande Prêmio de Mônaco', circuit: 'Circuito de Mônaco', country: 'MC', city: 'Monte Carlo', laps: 78, date: '2025-05-25', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Monte-Carlo_Formula_1_track_map.svg/320px-Monte-Carlo_Formula_1_track_map.svg.png' },
    { round: 9, name: 'Grande Prêmio da Espanha', circuit: 'Circuito de Barcelona-Catalunha', country: 'ES', city: 'Barcelona', laps: 66, date: '2025-06-01', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Circuit_de_Barcelona-Catalunya.svg/320px-Circuit_de_Barcelona-Catalunya.svg.png' },
    { round: 10, name: 'Grande Prêmio do Canadá', circuit: 'Circuito Gilles Villeneuve', country: 'CA', city: 'Montreal', laps: 70, date: '2025-06-15', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Circuit_Gilles_Villeneuve.svg/320px-Circuit_Gilles_Villeneuve.svg.png' },
    { round: 11, name: 'Grande Prêmio da Áustria', circuit: 'Red Bull Ring', country: 'AT', city: 'Spielberg', laps: 71, date: '2025-06-29', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/RedBullRing.svg/320px-RedBullRing.svg.png' },
    { round: 12, name: 'Grande Prêmio da Grã-Bretanha', circuit: 'Circuito de Silverstone', country: 'GB', city: 'Silverstone', laps: 52, date: '2025-07-06', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Silverstone_Circuit_2010.svg/320px-Silverstone_Circuit_2010.svg.png' },
    { round: 13, name: 'Grande Prêmio da Bélgica', circuit: 'Circuito de Spa-Francorchamps', country: 'BE', city: 'Spa', laps: 44, date: '2025-07-27', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Spa_F1.svg/320px-Spa_F1.svg.png' },
    { round: 14, name: 'Grande Prêmio da Hungria', circuit: 'Hungaroring', country: 'HU', city: 'Budapeste', laps: 70, date: '2025-08-03', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Hungaroring.svg/320px-Hungaroring.svg.png' },
    { round: 15, name: 'Grande Prêmio dos Países Baixos', circuit: 'Circuito de Zandvoort', country: 'NL', city: 'Zandvoort', laps: 72, date: '2025-08-31', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Zandvoort.svg/320px-Zandvoort.svg.png' },
    { round: 16, name: 'Grande Prêmio da Itália', circuit: 'Autódromo Nacional de Monza', country: 'IT', city: 'Monza', laps: 53, date: '2025-09-07', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Monza.svg/320px-Monza.svg.png' },
    { round: 17, name: 'Grande Prêmio do Azerbaijão', circuit: 'Circuito de Baku', country: 'AZ', city: 'Baku', laps: 51, date: '2025-09-21', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Baku_Formula_1_track.svg/320px-Baku_Formula_1_track.svg.png' },
    { round: 18, name: 'Grande Prêmio de Singapura', circuit: 'Circuito de Marina Bay', country: 'SG', city: 'Singapura', laps: 62, date: '2025-10-05', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Singapore_circuit.svg/320px-Singapore_circuit.svg.png' },
    { round: 19, name: 'Grande Prêmio dos Estados Unidos', circuit: 'Circuito das Américas', country: 'US', city: 'Austin', laps: 56, date: '2025-10-19', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circuit_of_the_Americas_track_map.svg/320px-Circuit_of_the_Americas_track_map.svg.png' },
    { round: 20, name: 'Grande Prêmio do México', circuit: 'Autódromo Hermanos Rodríguez', country: 'MX', city: 'Cidade do México', laps: 71, date: '2025-10-26', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Aut%C3%B3dromo_Hermanos_Rodr%C3%ADguez_track_map.svg/320px-Aut%C3%B3dromo_Hermanos_Rodr%C3%ADguez_track_map.svg.png' },
    { round: 21, name: 'Grande Prêmio do Brasil', circuit: 'Autódromo José Carlos Pace', country: 'BR', city: 'São Paulo', laps: 71, date: '2025-11-09', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aut%C3%B3dromo_Jos%C3%A9_Carlos_Pace.svg/320px-Aut%C3%B3dromo_Jos%C3%A9_Carlos_Pace.svg.png' },
    { round: 22, name: 'Grande Prêmio de Las Vegas', circuit: 'Circuito de Las Vegas Strip', country: 'US', city: 'Las Vegas', laps: 50, date: '2025-11-22', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Las_Vegas_Strip_Circuit_track_map.svg/320px-Las_Vegas_Strip_Circuit_track_map.svg.png' },
    { round: 23, name: 'Grande Prêmio do Catar', circuit: 'Circuito Internacional de Lusail', country: 'QA', city: 'Lusail', laps: 57, date: '2025-11-30', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Lusail_International_Circuit_track_map.svg/320px-Lusail_International_Circuit_track_map.svg.png' },
    { round: 24, name: 'Grande Prêmio de Abu Dhabi', circuit: 'Circuito de Yas Marina', country: 'AE', city: 'Abu Dhabi', laps: 58, date: '2025-12-07', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Yas_Marina_Circuit_2021.svg/320px-Yas_Marina_Circuit_2021.svg.png' },
];

@Injectable({
    providedIn: 'root'
})
export class RaceService {
    private apiUrl = 'http://localhost:8000/api/races';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Race[]> {
        return this.http.get<Race[]>(this.apiUrl);
    }

    create(race: Omit<Race, 'id'>): Observable<Race> {
        return this.http.post<Race>(this.apiUrl, race);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
