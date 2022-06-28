import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhrasesListComponent } from './phrases-list/phrases-list.component';
import { PhraseDetailsComponent } from './phrase-details/phrase-details.component';
import { PhraseHomeComponent } from './phrase-home/phrase-home.component';
import { CanDeactivateGuard } from '../shared/can-deactivate.guard';
import { PhraseDetailsResolver } from '../shared/phrase-details.resolver';

const routes: Routes = [
  {
    path: 'phrases', component: PhraseHomeComponent,
    children: [{
      path: '',
      component: PhrasesListComponent,
      children: [
        {
          path: ':id',
          component: PhraseDetailsComponent,
          canDeactivate: [CanDeactivateGuard],
          resolve: { phrase: PhraseDetailsResolver }
        }
      ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhrasesRoutingModule { }
