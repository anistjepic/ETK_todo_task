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
  private apiServerUrl = environment.apiUrl + "/columns";
  constructor(private http: HttpClient) {}

  getColumns(boardId: number): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.apiServerUrl}/getColumns/${boardId}`);
  }

  createColumn(column: Column): Observable<Column> {
    return this.http.post<Column>(`http://localhost:8080/columns/createColumn`, column);
  }

  deleteColumn(columnId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${columnId}`);
  }

  getBoard(id: number): Observable<Board | undefined> {
    const boardUrl = `http://localhost:8080/getBoard?id=${id}`;
    return this.http.get<Board>(boardUrl);
  }

  getBoards(): Observable<Board[]> {
    const boardsUrl = 'http://localhost:8080/getBoards';
    return this.http.get<Board[]>(boardsUrl);
  }

  filterByStatus(columnStatus: string): Observable<Column[]> {
    return this.http.get<Column[]>(this.apiServerUrl + "/" + columnStatus);
  }
}
