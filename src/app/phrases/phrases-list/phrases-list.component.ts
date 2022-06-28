import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Phrase } from '../../shared/phrase';
import { PhraseService } from '../../shared/phrase.service';

@Component({
  selector: 'app-phrases-list',
  templateUrl: './phrases-list.component.html',
  styleUrls: ['./phrases-list.component.scss'],
})
export class PhrasesListComponent implements OnInit {

  phrases!: Phrase[]
  private selectedID!: number

  constructor(
    private phraseService: PhraseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.selectedID = +params['id']

      this.phraseService.getAllPhrases().then(res => {
        this.phrases = res
      })
    })
  }

  onSelect(phrase: Phrase) {
    this.router.navigate(['phrases', phrase.id])
  }

  isSelected(phrase: Phrase): boolean {
    return phrase.id === this.selectedID
  }

}
