import { Injectable } from '@angular/core';
import { Board } from '../models/board';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private boardsUrl = environment.apiUrl + "/boards";

  constructor(private http: HttpClient) { }

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.boardsUrl);
  }

  createBoard(board: Board): Observable<Board> {
    return this.http.post<Board>(`${this.boardsUrl}/createBoard`, board);
  }

  getBoardByName(name: string): Observable<Board> {
    return this.http.get<Board>(`${this.boardsUrl}/${name}`);
  }

  editBoardName(oldName: string, newName: string): Observable<Board> {
    return this.http.get<Board>(`${this.boardsUrl}/${oldName}/${newName}`);
  }

  getBoardByBoardId(boardId: number): Observable<Board> {
    return this.http.get<{ board: Board, boardName: string }>(`${this.boardsUrl}/getBoard/${boardId}`);
  }

  deleteBoard(boardId: number): Observable<void> {
    return this.http.delete<void>(`${this.boardsUrl}/${boardId}`);
  }

  checkIfBoardNameExists(boardName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.boardsUrl}/checkBoardName/${boardName}`);
  }
}