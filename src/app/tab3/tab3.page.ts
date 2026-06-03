import { Component } from '@angular/core';
import { SenhaService } from '../tabs/senha.service'; // Se der erro de caminho, mude para '../senha.service'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false
})
export class Tab3Page {
  senhaAtual: any = null;

  constructor(public senhaService: SenhaService) {}

  // CORREÇÃO DA SENHA TRAVADA: Força o app a buscar a próxima senha real da fila
  chamar(guiche: number) {
    const proxima = this.senhaService.chamarProximaSenha(guiche);
    if (proxima) {
      this.senhaAtual = proxima;
    } else {
      alert('Não há clientes na fila de espera!');
    }
  }

  // CORREÇÃO DO DESEMPENHO: Recalcula do zero toda vez que a tela atualiza
  get totalEmitidas() {
    return this.senhaService.senhasFila.length + this.senhaService.senhasChamadas.length;
  }

  get totalAtendidas() {
    return this.senhaService.senhasChamadas.length;
  }

  get emitidasPorTipo() {
    const todas = [...this.senhaService.senhasFila, ...this.senhaService.senhasChamadas];
    return {
      SP: todas.filter((s: any) => s.tipo === 'SP').length,
      SE: todas.filter((s: any) => s.tipo === 'SE').length,
      SG: todas.filter((s: any) => s.tipo === 'SG').length
    };
  }

  get atendidasPorTipo() {
    return {
      SP: this.senhaService.senhasChamadas.filter((s: any) => s.tipo === 'SP').length,
      SE: this.senhaService.senhasChamadas.filter((s: any) => s.tipo === 'SE').length,
      SG: this.senhaService.senhasChamadas.filter((s: any) => s.tipo === 'SG').length
    };
  }
}