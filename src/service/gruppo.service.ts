import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Gruppo } from 'src/model/gruppo.model';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { plainToClass, classToPlain } from 'class-transformer';

@Injectable({
  providedIn: 'root',
})
export class EmojiService {

  private gruppoSubject = new BehaviorSubject<Gruppo[]>(undefined);
  public gruppo = this.gruppoSubject.asObservable();

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.caricaGruppi();
  }

  caricaGruppi(): void {
    const g = this.storage.get('gruppi');
    if (g) {
      const gr = g.map(r => plainToClass(Gruppo, r));
      this.gruppoSubject.next(g);
      console.log(this.gruppoSubject.value);
    } else {
      this.gruppoSubject.next([]);
      this.memorizzaGruppi();
    }
  }

  memorizzaGruppi(): void {
    const gs = classToPlain(this.gruppoSubject.value);
    this.storage.set('gruppi', gs);
  }

  aggiungiGruppo(gruppo: Gruppo): void {
    this.gruppoSubject.value.push(gruppo);
    this.memorizzaGruppi();
  }

  modificaGruppo(gruppo: Gruppo): void {
    const gs = this.gruppoSubject.value.filter(g => g.nome !== gruppo.nome);
    gs.push(gruppo);
    this.gruppoSubject.next(gs);
    this.memorizzaGruppi();
  }

  prendi(id: number): Gruppo {
    return this.gruppoSubject.value.find(g => g.id === id);
  }


}
