export class Base {
  id: number;
  ordine: number;
  datacreazione: number;
  datamodifica: number;

  constructor() {
    this.datacreazione = new Date().getTime();
  }

  update() {
    this.datamodifica = new Date().getTime();
  }
}

export enum Ordine {
  CRESCENTE = 'crescente', DECRESCENTE = 'decrescente'
}
