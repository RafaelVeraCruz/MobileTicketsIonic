import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhaService {
  senhasFila: any[] = [];
  senhasChamadas: any[] = [];
  contador = { SP: 1, SE: 1, SG: 1 };
  ultimaChamadaFoiSP = false;

  constructor() { }

  gerarSenha(tipo: string) {
    const hoje = new Date();
    const yy = hoje.getFullYear().toString().slice(2);
    const mm = String(hoje.getMonth() + 1).padStart(2, '0');
    const dd = String(hoje.getDate()).padStart(2, '0');
    
    const sq = String(this.contador[tipo as keyof typeof this.contador]++).padStart(2, '0');
    const numeroSenha = `${yy}${mm}${dd}-${tipo}${sq}`; 
    
    this.senhasFila.push({ numero: numeroSenha, tipo: tipo });
    return numeroSenha;
  }

  chamarProximaSenha(guiche: number) {
    if (this.senhasFila.length === 0) return null;

    let indexParaChamar = 0;

    if (this.ultimaChamadaFoiSP) {
       const indexOutras = this.senhasFila.findIndex(s => s.tipo !== 'SP');
       if (indexOutras !== -1) {
           indexParaChamar = indexOutras;
           this.ultimaChamadaFoiSP = false;
       } else {
           this.ultimaChamadaFoiSP = true;
       }
    } else {
       const indexSP = this.senhasFila.findIndex(s => s.tipo === 'SP');
       if (indexSP !== -1) {
           indexParaChamar = indexSP;
           this.ultimaChamadaFoiSP = true;
       } else {
           this.ultimaChamadaFoiSP = false;
       }
    }

    const senhaChamada = this.senhasFila.splice(indexParaChamar, 1)[0];
    senhaChamada.guiche = guiche;
    this.senhasChamadas.push(senhaChamada);
    
    return senhaChamada;
  }
}