import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Gruppo } from 'src/model/gruppo.model';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { plainToClass, classToPlain } from 'class-transformer';
import { EmojiGruppo } from '../model/gruppo.model';
import { EmojiService } from './emoji.service';

@Injectable({
  providedIn: 'root',
})
export class GruppoService {

  private gruppiSubject = new BehaviorSubject<Gruppo[]>(undefined);
  public gruppi = this.gruppiSubject.asObservable();

  private emojiSubject = new BehaviorSubject<EmojiGruppo[]>(undefined);
  public emoji = this.emojiSubject.asObservable();

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private emojiService: EmojiService
  ) {
    this.caricaGruppi();
    this.caricaEmoji();
  }

  caricaGruppi(): void {
    const g = this.storage.get('gruppi');
    if (g) {
      const gr = g.map(r => plainToClass(Gruppo, r));
      this.gruppiSubject.next(g);
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
    const GS = this.emojiSubject.value;
    for (const g of GS) {
      g.emoji = null;
    }
    const gs = classToPlain(GS);
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
    const eg = new EmojiGruppo(gruppoid, emojiid);
    eg.id = this.emojiTotali + 1;
    eg.ordine = this.emojiTotali + 1;
    eg.update();

    this.emojiSubject.value.push(eg);
    this.memorizzaEmoji();

  }

  rimuoviEmoji(gruppoid: number, emojiid: number): void {
    const eg = this.emojiSubject.value.filter(e => ((e.gruppoid !== gruppoid) || (e.gruppoid === gruppoid && e.emojiid !== emojiid)));
    this.emojiSubject.next(eg);
    this.memorizzaEmoji();
  }

  prendiEmoji(gruppoid: number): EmojiGruppo[] {
    const eg = this.emojiSubject.value.filter(el => el.gruppoid === gruppoid);
    for (const e of eg) {
      e.emoji = this.emojiService.prendi(e.emojiid);
    }
    return eg;
  }

  get emojiTotali(): number {
    return this.emojiSubject.value.length;
  }

  get gruppiTotali(): number {
    return this.gruppiSubject.value.length;
  }


}
