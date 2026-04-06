import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  usuarioAtual = 'Felipe';
  atualizarUsuario() {
    this.usuarioAtual = 'Antonia';
  }
}
