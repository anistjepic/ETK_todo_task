import { Injectable } from '@angular/core';
import { Board } from '../models/board';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private apiServerUrl = environment.apiUrl + "/boards";
  constructor(private http: HttpClient) { }

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.apiServerUrl);
  }

  createBoard(board: Board): Observable<Board> {
    return this.http.post<Board>(`http://localhost:8080/boards/createBoard`, board);
  }

  getBoardByName(name: string): Observable<Board> {
    const boardUrl = `http://localhost:8080/boards/${name}`;
    return this.http.get<Board>(boardUrl);
  }

  editBoardName(oldName: string, newName: string): Observable<Board> {
    const boardUrl = `http://localhost:8080/boards/${oldName}/${newName}`;
    return this.http.get<Board>(boardUrl);
  }


  getBoardByBoardId(boardId: number): Observable<Board> {
    const boardUrl = `http://localhost:8080/boards/getBoard/${boardId}`;

    return this.http.get<{ board: Board, boardName: string }>(boardUrl);
  }

  deleteBoard(boardId: number): Observable<void> {
    const boardUrl = `http://localhost:8080/boards/${boardId}`
    return this.http.delete<void>(boardUrl);
  }
}