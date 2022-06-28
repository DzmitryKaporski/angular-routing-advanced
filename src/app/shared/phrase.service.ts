import { Injectable } from '@angular/core';
import { PHRASES } from './data';
import { Phrase } from './phrase';

const phrasesPromise: Promise<Phrase[]> = new Promise((resolve) => {
  setTimeout(() => {
    resolve(PHRASES)
  }, 2000)
})

@Injectable({
  providedIn: 'root'
})
export class PhraseService {

  constructor() { }

  getAllPhrases(): Promise<Phrase[]> {
    return phrasesPromise
  }

  getPhrase(id: number): Promise<Phrase | undefined> {
    return phrasesPromise.then(phrases => phrases.find(phrase => phrase.id === id))
  }
}
