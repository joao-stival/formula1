import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export interface Pais {
    nome: string;
    sigla: string;
}

export const PAISES: Pais[] = [
    { nome: 'Afeganistão', sigla: 'AF' },
    { nome: 'África do Sul', sigla: 'ZA' },
    { nome: 'Albânia', sigla: 'AL' },
    { nome: 'Alemanha', sigla: 'DE' },
    { nome: 'Andorra', sigla: 'AD' },
    { nome: 'Angola', sigla: 'AO' },
    { nome: 'Anguilla', sigla: 'AI' },
    { nome: 'Antártida', sigla: 'AQ' },
    { nome: 'Antígua e Barbuda', sigla: 'AG' },
    { nome: 'Antilhas Holandesas', sigla: 'AN' },
    { nome: 'Arábia Saudita', sigla: 'SA' },
    { nome: 'Argélia', sigla: 'DZ' },
    { nome: 'Argentina', sigla: 'AR' },
    { nome: 'Armênia', sigla: 'AM' },
    { nome: 'Aruba', sigla: 'AW' },
    { nome: 'Austrália', sigla: 'AU' },
    { nome: 'Áustria', sigla: 'AT' },
    { nome: 'Azerbaijão', sigla: 'AZ' },
    { nome: 'Bahamas', sigla: 'BS' },
    { nome: 'Bahrein', sigla: 'BH' },
    { nome: 'Bangladesh', sigla: 'BD' },
    { nome: 'Barbados', sigla: 'BB' },
    { nome: 'Belarus', sigla: 'BY' },
    { nome: 'Bélgica', sigla: 'BE' },
    { nome: 'Belize', sigla: 'BZ' },
    { nome: 'Benin', sigla: 'BJ' },
    { nome: 'Bermudas', sigla: 'BM' },
    { nome: 'Bolívia', sigla: 'BO' },
    { nome: 'Bósnia-Herzegóvina', sigla: 'BA' },
    { nome: 'Botsuana', sigla: 'BW' },
    { nome: 'Brasil', sigla: 'BR' },
    { nome: 'Brunei', sigla: 'BN' },
    { nome: 'Bulgária', sigla: 'BG' },
    { nome: 'Burkina Fasso', sigla: 'BF' },
    { nome: 'Burundi', sigla: 'BI' },
    { nome: 'Butão', sigla: 'BT' },
    { nome: 'Cabo Verde', sigla: 'CV' },
    { nome: 'Camarões', sigla: 'CM' },
    { nome: 'Camboja', sigla: 'KH' },
    { nome: 'Canadá', sigla: 'CA' },
    { nome: 'Cazaquistão', sigla: 'KZ' },
    { nome: 'Chade', sigla: 'TD' },
    { nome: 'Chile', sigla: 'CL' },
    { nome: 'China', sigla: 'CN' },
    { nome: 'Chipre', sigla: 'CY' },
    { nome: 'Cingapura', sigla: 'SG' },
    { nome: 'Colômbia', sigla: 'CO' },
    { nome: 'Congo', sigla: 'CG' },
    { nome: 'Coréia do Norte', sigla: 'KP' },
    { nome: 'Coréia do Sul', sigla: 'KR' },
    { nome: 'Costa do Marfim', sigla: 'CI' },
    { nome: 'Costa Rica', sigla: 'CR' },
    { nome: 'Croácia (Hrvatska)', sigla: 'HR' },
    { nome: 'Cuba', sigla: 'CU' },
    { nome: 'Dinamarca', sigla: 'DK' },
    { nome: 'Djibuti', sigla: 'DJ' },
    { nome: 'Dominica', sigla: 'DM' },
    { nome: 'Egito', sigla: 'EG' },
    { nome: 'El Salvador', sigla: 'SV' },
    { nome: 'Emirados Árabes Unidos', sigla: 'AE' },
    { nome: 'Equador', sigla: 'EC' },
    { nome: 'Eritréia', sigla: 'ER' },
    { nome: 'Eslováquia', sigla: 'SK' },
    { nome: 'Eslovênia', sigla: 'SI' },
    { nome: 'Espanha', sigla: 'ES' },
    { nome: 'Estados Unidos', sigla: 'US' },
    { nome: 'Estônia', sigla: 'EE' },
    { nome: 'Etiópia', sigla: 'ET' },
    { nome: 'Fiji', sigla: 'FJ' },
    { nome: 'Filipinas', sigla: 'PH' },
    { nome: 'Finlândia', sigla: 'FI' },
    { nome: 'França', sigla: 'FR' },
    { nome: 'Gabão', sigla: 'GA' },
    { nome: 'Gâmbia', sigla: 'GM' },
    { nome: 'Gana', sigla: 'GH' },
    { nome: 'Geórgia', sigla: 'GE' },
    { nome: 'Gibraltar', sigla: 'GI' },
    { nome: 'Grã-Bretanha (Reino Unido, UK)', sigla: 'GB' },
    { nome: 'Granada', sigla: 'GD' },
    { nome: 'Grécia', sigla: 'GR' },
    { nome: 'Groelândia', sigla: 'GL' },
    { nome: 'Guadalupe', sigla: 'GP' },
    { nome: 'Guam (Território dos Estados Unidos)', sigla: 'GU' },
    { nome: 'Guatemala', sigla: 'GT' },
    { nome: 'Guernsey', sigla: 'GG' },
    { nome: 'Guiana', sigla: 'GY' },
    { nome: 'Guiana Francesa', sigla: 'GF' },
    { nome: 'Guiné', sigla: 'GN' },
    { nome: 'Guiné Equatorial', sigla: 'GQ' },
    { nome: 'Guiné-Bissau', sigla: 'GW' },
    { nome: 'Haiti', sigla: 'HT' },
    { nome: 'Holanda', sigla: 'NL' },
    { nome: 'Honduras', sigla: 'HN' },
    { nome: 'Hong Kong', sigla: 'HK' },
    { nome: 'Hungria', sigla: 'HU' },
    { nome: 'Iêmen', sigla: 'YE' },
    { nome: 'Ilha Bouvet (Território da Noruega)', sigla: 'BV' },
    { nome: 'Ilha do Homem', sigla: 'IM' },
    { nome: 'Ilha Natal', sigla: 'CX' },
    { nome: 'Ilha Pitcairn', sigla: 'PN' },
    { nome: 'Ilha Reunião', sigla: 'RE' },
    { nome: 'Ilhas Aland', sigla: 'AX' },
    { nome: 'Ilhas Cayman', sigla: 'KY' },
    { nome: 'Ilhas Cocos', sigla: 'CC' },
    { nome: 'Ilhas Comores', sigla: 'KM' },
    { nome: 'Ilhas Cook', sigla: 'CK' },
    { nome: 'Ilhas Faroes', sigla: 'FO' },
    { nome: 'Ilhas Falkland (Malvinas)', sigla: 'FK' },
    { nome: 'Ilhas Geórgia do Sul e Sandwich do Sul', sigla: 'GS' },
    { nome: 'Ilhas Heard e McDonald (Território da Austrália)', sigla: 'HM' },
    { nome: 'Ilhas Marianas do Norte', sigla: 'MP' },
    { nome: 'Ilhas Marshall', sigla: 'MH' },
    { nome: 'Ilhas Menores dos Estados Unidos', sigla: 'UM' },
    { nome: 'Ilhas Norfolk', sigla: 'NF' },
    { nome: 'Ilhas Seychelles', sigla: 'SC' },
    { nome: 'Ilhas Solomão', sigla: 'SB' },
    { nome: 'Ilhas Svalbard e Jan Mayen', sigla: 'SJ' },
    { nome: 'Ilhas Tokelau', sigla: 'TK' },
    { nome: 'Ilhas Turks e Caicos', sigla: 'TC' },
    { nome: 'Ilhas Virgens (Estados Unidos)', sigla: 'VI' },
    { nome: 'Ilhas Virgens (Inglaterra)', sigla: 'VG' },
    { nome: 'Ilhas Wallis e Futuna', sigla: 'WF' },
    { nome: 'Índia', sigla: 'IN' },
    { nome: 'Indonésia', sigla: 'ID' },
    { nome: 'Irã', sigla: 'IR' },
    { nome: 'Iraque', sigla: 'IQ' },
    { nome: 'Irlanda', sigla: 'IE' },
    { nome: 'Islândia', sigla: 'IS' },
    { nome: 'Israel', sigla: 'IL' },
    { nome: 'Itália', sigla: 'IT' },
    { nome: 'Jamaica', sigla: 'JM' },
    { nome: 'Japão', sigla: 'JP' },
    { nome: 'Jersey', sigla: 'JE' },
    { nome: 'Jordânia', sigla: 'JO' },
    { nome: 'Kênia', sigla: 'KE' },
    { nome: 'Kiribati', sigla: 'KI' },
    { nome: 'Kuait', sigla: 'KW' },
    { nome: 'Laos', sigla: 'LA' },
    { nome: 'Látvia', sigla: 'LV' },
    { nome: 'Lesoto', sigla: 'LS' },
    { nome: 'Líbano', sigla: 'LB' },
    { nome: 'Libéria', sigla: 'LR' },
    { nome: 'Líbia', sigla: 'LY' },
    { nome: 'Liechtenstein', sigla: 'LI' },
    { nome: 'Lituânia', sigla: 'LT' },
    { nome: 'Luxemburgo', sigla: 'LU' },
    { nome: 'Macau', sigla: 'MO' },
    { nome: 'Macedônia (República Yugoslava)', sigla: 'MK' },
    { nome: 'Madagascar', sigla: 'MG' },
    { nome: 'Malásia', sigla: 'MY' },
    { nome: 'Malaui', sigla: 'MW' },
    { nome: 'Maldivas', sigla: 'MV' },
    { nome: 'Mali', sigla: 'ML' },
    { nome: 'Malta', sigla: 'MT' },
    { nome: 'Marrocos', sigla: 'MA' },
    { nome: 'Martinica', sigla: 'MQ' },
    { nome: 'Maurício', sigla: 'MU' },
    { nome: 'Mauritânia', sigla: 'MR' },
    { nome: 'Mayotte', sigla: 'YT' },
    { nome: 'México', sigla: 'MX' },
    { nome: 'Micronésia', sigla: 'FM' },
    { nome: 'Moçambique', sigla: 'MZ' },
    { nome: 'Moldova', sigla: 'MD' },
    { nome: 'Mônaco', sigla: 'MC' },
    { nome: 'Mongólia', sigla: 'MN' },
    { nome: 'Montenegro', sigla: 'ME' },
    { nome: 'Montserrat', sigla: 'MS' },
    { nome: 'Myanma', sigla: 'MM' },
    { nome: 'Namíbia', sigla: 'NA' },
    { nome: 'Nauru', sigla: 'NR' },
    { nome: 'Nepal', sigla: 'NP' },
    { nome: 'Nicarágua', sigla: 'NI' },
    { nome: 'Níger', sigla: 'NE' },
    { nome: 'Nigéria', sigla: 'NG' },
    { nome: 'Niue', sigla: 'NU' },
    { nome: 'Noruega', sigla: 'NO' },
    { nome: 'Nova Caledônia', sigla: 'NC' },
    { nome: 'Nova Zelândia', sigla: 'NZ' },
    { nome: 'Omã', sigla: 'OM' },
    { nome: 'Palau', sigla: 'PW' },
    { nome: 'Panamá', sigla: 'PA' },
    { nome: 'Papua-Nova Guiné', sigla: 'PG' },
    { nome: 'Paquistão', sigla: 'PK' },
    { nome: 'Paraguai', sigla: 'PY' },
    { nome: 'Peru', sigla: 'PE' },
    { nome: 'Polinésia Francesa', sigla: 'PF' },
    { nome: 'Polônia', sigla: 'PL' },
    { nome: 'Porto Rico', sigla: 'PR' },
    { nome: 'Portugal', sigla: 'PT' },
    { nome: 'Qatar', sigla: 'QA' },
    { nome: 'Quirguistão', sigla: 'KG' },
    { nome: 'República Centro-Africana', sigla: 'CF' },
    { nome: 'República Democrática do Congo', sigla: 'CD' },
    { nome: 'República Dominicana', sigla: 'DO' },
    { nome: 'República Tcheca', sigla: 'CZ' },
    { nome: 'Romênia', sigla: 'RO' },
    { nome: 'Ruanda', sigla: 'RW' },
    { nome: 'Rússia (antiga URSS) - Federação Russa', sigla: 'RU' },
    { nome: 'Saara Ocidental', sigla: 'EH' },
    { nome: 'Saint Vincente e Granadinas', sigla: 'VC' },
    { nome: 'Samoa Americana', sigla: 'AS' },
    { nome: 'Samoa Ocidental', sigla: 'WS' },
    { nome: 'San Marino', sigla: 'SM' },
    { nome: 'Santa Helena', sigla: 'SH' },
    { nome: 'Santa Lúcia', sigla: 'LC' },
    { nome: 'São Bartolomeu', sigla: 'BL' },
    { nome: 'São Cristóvão e Névis', sigla: 'KN' },
    { nome: 'São Martim', sigla: 'MF' },
    { nome: 'São Tomé e Príncipe', sigla: 'ST' },
    { nome: 'Senegal', sigla: 'SN' },
    { nome: 'Serra Leoa', sigla: 'SL' },
    { nome: 'Sérvia', sigla: 'RS' },
    { nome: 'Síria', sigla: 'SY' },
    { nome: 'Somália', sigla: 'SO' },
    { nome: 'Sri Lanka', sigla: 'LK' },
    { nome: 'St. Pierre and Miquelon', sigla: 'PM' },
    { nome: 'Suazilândia', sigla: 'SZ' },
    { nome: 'Sudão', sigla: 'SD' },
    { nome: 'Suécia', sigla: 'SE' },
    { nome: 'Suíça', sigla: 'CH' },
    { nome: 'Suriname', sigla: 'SR' },
    { nome: 'Tadjiquistão', sigla: 'TJ' },
    { nome: 'Tailândia', sigla: 'TH' },
    { nome: 'Taiwan', sigla: 'TW' },
    { nome: 'Tanzânia', sigla: 'TZ' },
    { nome: 'Território Britânico do Oceano Índico', sigla: 'IO' },
    { nome: 'Territórios do Sul da França', sigla: 'TF' },
    { nome: 'Territórios Palestinos Ocupados', sigla: 'PS' },
    { nome: 'Timor Leste', sigla: 'TP' },
    { nome: 'Togo', sigla: 'TG' },
    { nome: 'Tonga', sigla: 'TO' },
    { nome: 'Trinidad and Tobago', sigla: 'TT' },
    { nome: 'Tunísia', sigla: 'TN' },
    { nome: 'Turcomenistão', sigla: 'TM' },
    { nome: 'Turquia', sigla: 'TR' },
    { nome: 'Tuvalu', sigla: 'TV' },
    { nome: 'Ucrânia', sigla: 'UA' },
    { nome: 'Uganda', sigla: 'UG' },
    { nome: 'Uruguai', sigla: 'UY' },
    { nome: 'Uzbequistão', sigla: 'UZ' },
    { nome: 'Vanuatu', sigla: 'VU' },
    { nome: 'Vaticano', sigla: 'VA' },
    { nome: 'Venezuela', sigla: 'VE' },
    { nome: 'Vietnã', sigla: 'VN' },
    { nome: 'Zâmbia', sigla: 'ZM' },
    { nome: 'Zimbábue', sigla: 'ZW' },
];

@Component({
    selector: 'app-country-select',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './country-select.component.html',
    styleUrl: './country-select.component.scss'
})
export class CountrySelectComponent implements OnInit, OnDestroy {
    @Input() selectedCountry: string = '';
    @Output() selectedCountryChange = new EventEmitter<string>();

    searchControl = new FormControl('');
    isOpen = false;
    filteredPaises: Pais[] = PAISES;

    private destroy$ = new Subject<void>();

    constructor(private elementRef: ElementRef) { }

    get selectedPais(): Pais | undefined {
        return PAISES.find(p => p.sigla === this.selectedCountry);
    }

    getFlagUrl(sigla: string, size: number = 32): string {
        return `https://flagsapi.com/${sigla}/flat/${size}.png`;
    }

    ngOnInit(): void {
        this.searchControl.valueChanges.pipe(
            startWith(''),
            map(value => this.filterPaises(value || '')),
            takeUntil(this.destroy$)
        ).subscribe(filtered => {
            this.filteredPaises = filtered;
        });
    }

    private filterPaises(value: string): Pais[] {
        const filter = value.toLowerCase().trim();
        if (!filter) return PAISES;
        return PAISES.filter(p => p.nome.toLowerCase().includes(filter));
    }

    toggleDropdown(): void {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.searchControl.setValue('');
            setTimeout(() => {
                const input = this.elementRef.nativeElement.querySelector('.cs-search-input');
                if (input) input.focus();
            }, 50);
        }
    }

    selectPais(pais: Pais): void {
        this.selectedCountryChange.emit(pais.sigla);
        this.isOpen = false;
        this.searchControl.setValue('');
    }

    clearSelection(event: Event): void {
        event.stopPropagation();
        this.selectedCountryChange.emit('');
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
