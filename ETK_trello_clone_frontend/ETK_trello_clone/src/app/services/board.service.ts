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
  constructor(private http: HttpClient) {}

  getBoards() : Observable<Board[]> {
    return this.http.get<Board[]>(this.apiServerUrl);
  }
  createBoard(board: Board): Observable<Board> {
    return this.http.post<Board>(`http://localhost:8080/boards/createBoard`, board);
  }
  
}