import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Board } from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardSharedService {

  private newBoardSource = new BehaviorSubject<Board | null>(null);
  newBoard$ = this.newBoardSource.asObservable();

  constructor() {}

  emitNewBoard(board: Board): void {
    this.newBoardSource.next(board);
  }
}
