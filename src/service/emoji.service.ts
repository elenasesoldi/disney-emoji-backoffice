import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Emoji, CategoriaEmoji } from '../model/emoji.model';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { plainToClass, classToPlain } from 'class-transformer';

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

  prendiEmojyByCat(categoria: CategoriaEmoji): Emoji[] {
    return this.emojiSubject.value.filter(e => e.categoria === categoria);
  }

  prendiEmoji(campo: string, valore: any, categoria?: CategoriaEmoji): Emoji[] {
    const es = categoria ?
      this.emojiSubject.value.filter(e => (e.categoria === categoria && e[campo] === valore)) :
      this.emojiSubject.value.filter(e => e[campo] === valore);

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
