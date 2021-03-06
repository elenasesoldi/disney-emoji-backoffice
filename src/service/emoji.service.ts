import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Emoji, CategoriaEmoji } from '../model/emoji.model';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { plainToClass, classToPlain } from 'class-transformer';
import { Ordine } from '../model/base.model';

@Injectable({
  providedIn: 'root',
})
export class EmojiService {

  private emojiSubject = new BehaviorSubject<Emoji[]>(undefined);
  public emoji = this.emojiSubject.asObservable();

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {

    this.caricaEmoji();

  }

  caricaEmoji(): void {
    const e = this.storage.get('emoji');
    if (e) {
      const em = e.map(p => plainToClass(Emoji, p));
      this.emojiSubject.next(em);
      console.log(this.emojiSubject.value);
    } else {
      this.emojiSubject.next([]);
      this.memorizzaEmoji();
    }
  }

  memorizzaEmoji(): void {
    const es = classToPlain(this.emojiSubject.value);
    this.storage.set('emoji', es);
  }

  aggiungiEmoji(emoji: Emoji): void {
    this.emojiSubject.value.push(emoji);
    this.memorizzaEmoji();
  }

  modificaEmoji(emoji: Emoji): void {
    const es = this.emojiSubject.value.filter(e => e.nome !== emoji.nome);
    es.push(emoji);
    this.emojiSubject.next(es);
    this.memorizzaEmoji();
  }

  prendi(id: number): Emoji {
    return this.emojiSubject.value.find(e => e.id === id);
  }

  elimina(id: number): void {
    const es = this.emojiSubject.value.filter(e => e.id !== id);
    this.emojiSubject.next(es);
    this.memorizzaEmoji();
  }

  prendiEmojyByCat(categoria: CategoriaEmoji, campo?: string, ordine?: Ordine): Emoji[] {
    const field = campo ? campo : 'ordine'; // default ordine
    const sort = ordine ? ordine === Ordine.CRESCENTE : true; // default crescente
    return this.emojiSubject.value.filter(e => e.categoria === categoria)
      .sort((a, b) => a[field] > b[field] ? (sort ? 1 : -1) : (sort ? -1 : 1));
  }

  prendiEmoji(campo: string, valore: any, categoria?: CategoriaEmoji, campoordine?: string, ordine?: Ordine): Emoji[] {
    const field = campoordine ? campoordine : 'ordine'; // default ordine
    const sort = ordine ? ordine === Ordine.CRESCENTE : true; // default crescente

    const es = categoria ?
      (
        this.emojiSubject.value.filter(e => (e.categoria === categoria && e[campo] === valore))
          .sort((a, b) => a[field] > b[field] ? (sort ? 1 : -1) : (sort ? -1 : 1))) :
      (
        this.emojiSubject.value.filter(e => e[campo] === valore)
          .sort((a, b) => a[field] > b[field] ? (sort ? 1 : -1) : (sort ? -1 : 1))
      );

    return es;
  }

  contaEmoji(campo: string, valore: any, categoria?: CategoriaEmoji): number {

    const es = categoria ?
      this.emojiSubject.value.filter(e => (e.categoria === categoria && e[campo] === valore)) :
      this.emojiSubject.value.filter(e => e[campo] === valore);

    return es.length;
  }

  get emojiTotali(): number {
    return this.emojiSubject.value.length;
  }


}
