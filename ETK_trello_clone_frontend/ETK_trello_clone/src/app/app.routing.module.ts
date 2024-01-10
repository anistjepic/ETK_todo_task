import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { BoardListComponent } from './board-list/board-list.component';

const routes: Routes = [
  {
    path: 'board/:boardId',
    component: BoardComponent,
  },
  {
    path: 'boards',
    component: BoardListComponent,
  },
  {
    path: '',
    redirectTo: 'boards',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'boards',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
