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

  get emojiTotali(): number {
    return this.emojiSubject.value.length;
  }


  /*



  add(product: Product) {
    return this.ecommerceService.addToWishlist(this.user.id, product.id).subscribe((data: Wishlist) => {
      this.loadWishlist();
      if (!this.silent) {
        this.messageService.sendSuccess(this.translateService.instant('wishlist-add-success'));
      }
      const wishlistItem = this._products.value.find(item => item.id === product.id);
      if (!wishlistItem) {
        this._products.value.push(product);
      }
      this.setProducts();
    }, error => {
      console.error(error);
      if (!this.silent) {
        this.messageService.sendError(error, this.translateService.instant('wishlist-add-error'));
      }
    });
  }

  remove(wishlist: Wishlist) {
    return this.ecommerceService.removeWishlistItem(wishlist).subscribe(() => {
      this.loadWishlist();
      this.removeProduct(wishlist.productid);
      if (!this.silent) {
        this.messageService.sendSuccess(this.translateService.instant('wishlist-remove-success'));
      }
    }, error => {
      console.error(error);
      if (!this.silent) {
        this.messageService.sendError(error, this.translateService.instant('wishlist-remove-error'));
      }
    });

  }

  removeProduct(productid: number) {
    let ps = this._products.value;
    ps = ps.filter(p => p.id !== productid);
    this._products.next(ps);
    this.setProducts();
  }*/

}
