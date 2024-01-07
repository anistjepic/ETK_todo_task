import { Component, OnInit } from '@angular/core';
import { ColumnService } from '../services/column.service';
import { Column } from '../models/column';
import {HttpErrorResponse } from '@angular/common/http';
import { BoardService } from '../services/board.service';
import { Board } from '../models/board';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css'],
  providers: [ColumnService],
})
export class BoardListComponent implements OnInit {

  Columns: Column[] = [];
  boards: Board[] = [];
  boardTitle: string = "";

  constructor (private boardService: BoardService) {}
  
  ngOnInit(): void {
    this.getBoards();
  }
  
  getBoards(): void {
    this.boardService.getBoards().subscribe(
      (response: Board[]) => {
        this.boards = response;
        if (this.boards && this.boards.length > 0) {
          this.boardTitle = this.boards[0].boardName;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onColumnDeleted(deletedColumn: Column): void {
    this.Columns = this.Columns.filter(column => column.columnId !== deletedColumn.columnId);
  }
}

