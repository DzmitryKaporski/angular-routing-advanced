import { Component, OnInit } from '@angular/core';
import { Phrase } from '../../shared/phrase';
import { PhraseService } from '../../shared/phrase.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { CanComponentDeactivate } from 'src/app/shared/can-deactivate.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-phrase-details',
  templateUrl: './phrase-details.component.html',
  styleUrls: ['./phrase-details.component.scss']
})
export class PhraseDetailsComponent implements OnInit, CanComponentDeactivate {

  phrase!: Phrase
  editValue!: string
  editLanguage!: string

  constructor(
    private phraseService: PhraseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.phrase = data['phrase']
      this.editValue = this.phrase.value
      this.editLanguage = this.phrase.languages
    })
  }

  save(): void {
    if (this.phrase) {
      this.phrase.value = this.editValue
      this.phrase.languages = this.editLanguage
    }
  }

  isChanged(): boolean {
    return !(this.phrase?.value === this.editValue && this.phrase.languages === this.editLanguage)
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.phrase || !this.isChanged()) return true
    return confirm('Вы не сохранили изменения!!! \nДанные будут утеряны!!!')
  }

  gotoPhrasesList() {
    this.router.navigate(['/phrases', { id: this.phrase?.id }])
  }


}
