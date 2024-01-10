import { Component, Input, OnInit } from '@angular/core';
import { ColumnService } from '../services/column.service';
import { Column } from '../models/column';
import {HttpErrorResponse } from '@angular/common/http';
import { Board } from '../models/board';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [ColumnService]
})
export class BoardComponent implements OnInit {
  columns: Column[] = [];
  board!: Board;
  boardName!: string;

  constructor(private columnService: ColumnService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const boardId = params['boardId'];
      if (boardId) {
        this.getBoardDetails(boardId);
      }
    });
  }

  getBoardDetails(boardId: number): void {
    console.log("getBoardDetails");
    this.columnService.getBoard(boardId).subscribe(
      (response?: Board) => {
        if (response) {
          this.board = response;
          this.boardName = response.boardName;
          this.getColumnsByBoardId(boardId);
        } else {
          console.error(`Board with ID ${boardId} not found.`);
        }
      },
      (error) => {
        console.error('Error fetching board:', error);
      }
    );
  }

  getColumnsByBoardId(boardId: number): void {
    this.columnService.getColumns(boardId).subscribe(
      (response: Column[]) => {
        this.columns = response;
      },
      (error) => {
        console.error('Error fetching columns:', error);
      }
    );
  }

  onCreateColumn(column: Column): void {
    console.log("column: ", column);

    this.columnService.createColumn(column).subscribe(
      (response: Column) => {
        console.log('Column created successfully:', response);
        this.getColumnsByBoardId(column.board.boardId!);
      },
      (error) => {
        console.error('Error creating column:', error);
      }
    );
  }

  onDeleteColumn(column: Column): void {
    this.columnService.deleteColumn(column.columnId!).subscribe(
      (response: void) => {
        this.getColumnsByBoardId(this.board.boardId!);
        console.log('Column successfully deleted:', response);
      },
      (error) => {
        console.error('Error deleting column:', error);
      }
    );
  }
}

