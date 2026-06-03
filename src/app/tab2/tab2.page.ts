import { Component } from '@angular/core';
import { SenhaService } from '../tabs/senha.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false
})
export class Tab2Page {
  constructor(private senhaService: SenhaService) {}

  obterUltimasSenhas() {
    return this.senhaService.senhasChamadas.slice(-5).reverse();
  }
}
