import { Injectable } from '@angular/core';
import { Column } from '../models/column';
import { Board } from '../models/board';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {
  private columnsUrl = environment.apiUrl + "/columns";
  private boardsUrl = environment.apiUrl + "/boards";

  constructor(private http: HttpClient) { }

  getColumns(boardId: number): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.columnsUrl}/getColumns/${boardId}`);
  }

  createColumn(column: Column): Observable<Column> {
    return this.http.post<Column>(`${this.columnsUrl}/createColumn`, column);
  }

  deleteColumn(columnId: number): Observable<void> {
    return this.http.delete<void>(`${this.columnsUrl}/${columnId}`);
  }

  getBoard(boardId: number): Observable<Board | undefined> {
    return this.http.get<{ board: Board, boardName: string }>(`${this.boardsUrl}/getBoard/${boardId}`);
  }

  filterByStatus(status: string): Observable<Column> {
    return this.http.get<Column>(`${this.columnsUrl}/${status}`);
  }
}
