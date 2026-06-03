import { Component } from '@angular/core';
import { SenhaService } from '../tabs/senha.service'; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page {
  senhaGerada: string = '';

  constructor(private senhaService: SenhaService) {}

  emitirSenha(tipo: string) {
    this.senhaGerada = this.senhaService.gerarSenha(tipo);
  }
}