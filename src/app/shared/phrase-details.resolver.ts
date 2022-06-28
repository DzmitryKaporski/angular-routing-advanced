import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Phrase } from './phrase';
import { PhraseService } from './phrase.service';

@Injectable({
  providedIn: 'root',
})
export class PhraseDetailsResolver implements Resolve<Phrase | boolean> {

  constructor(
    private phraseService: PhraseService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Phrase | boolean> | Promise<Phrase | boolean> | any {
    const id = +route.params['id']

    if (isNaN(id)) {
      this.emptyNavigate()
      return Promise.resolve(false)
    }

    return this.phraseService.getPhrase(id).then((phrase: Phrase | undefined) => {
      if (phrase) {
        return phrase
      }
      this.emptyNavigate()
      return false
    })
  }

  private emptyNavigate(): void {
    this.router.navigate(['/phrase'])
  }
}
