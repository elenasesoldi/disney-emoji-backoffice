import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Gruppo } from 'src/model/gruppo.model';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { plainToClass, classToPlain } from 'class-transformer';
import { EmojiGruppo } from '../model/gruppo.model';

@Injectable({
  providedIn: 'root',
})
export class GruppoService {

  private gruppiSubject = new BehaviorSubject<Gruppo[]>(undefined);
  public gruppi = this.gruppiSubject.asObservable();

  private emojiSubject = new BehaviorSubject<EmojiGruppo[]>(undefined);
  public emoji = this.emojiSubject.asObservable();

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.caricaGruppi();
    this.caricaEmoji();
  }

  caricaGruppi(): void {
    const g = this.storage.get('gruppi');
    if (g) {
      const gr = g.map(r => plainToClass(Gruppo, r));
      this.gruppiSubject.next(g);
      console.log(this.gruppiSubject.value);
    } else {
      this.gruppiSubject.next([]);
      this.memorizzaGruppi();
    }
  }

  caricaEmoji(): void {
    const g = this.storage.get('emojigruppi');
    if (g) {
      const gr = g.map(r => plainToClass(EmojiGruppo, r));
      this.emojiSubject.next(g);
      console.log(this.emojiSubject.value);
    } else {
      this.emojiSubject.next([]);
      this.memorizzaEmoji();
    }
  }

  memorizzaGruppi(): void {
    const gs = classToPlain(this.gruppiSubject.value);
    this.storage.set('gruppi', gs);
  }

  memorizzaEmoji(): void {
    const gs = classToPlain(this.emojiSubject.value);
    this.storage.set('emojigruppi', gs);
  }

  aggiungiGruppo(gruppo: Gruppo): void {
    this.gruppiSubject.value.push(gruppo);
    this.memorizzaGruppi();
  }

  modificaGruppo(gruppo: Gruppo): void {
    const gs = this.gruppiSubject.value.filter(g => g.nome !== gruppo.nome);
    gs.push(gruppo);
    this.gruppiSubject.next(gs);
    this.memorizzaGruppi();
  }

  prendi(id: number): Gruppo {
    return this.gruppiSubject.value.find(g => g.id === id);
  }

  aggiungiEmojiGruppo(gruppoid: number, emojiid: number): void {
    const eg = new EmojiGruppo();
    eg.id = this.emojiTotali + 1;
    eg.ordine = this.emojiTotali + 1;
    eg.gruppoid = gruppoid;
    eg.emojiid = emojiid;

    this.emojiSubject.value.push(eg);
    this.memorizzaEmoji();

  }

  prendiEmoji(gruppoid: number): EmojiGruppo[] {
    return this.emojiSubject.value.filter(el => el.gruppoid === gruppoid);
  }

  get emojiTotali(): number {
    return this.emojiSubject.value.length;
  }

  get gruppiTotali(): number {
    return this.gruppiSubject.value.length;
  }


}
