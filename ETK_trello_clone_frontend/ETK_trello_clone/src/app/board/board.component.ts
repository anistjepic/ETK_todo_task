import { Component, OnInit } from '@angular/core';
import { ColumnService } from '../services/column.service';
import { Column } from '../models/column';
import {HttpErrorResponse } from '@angular/common/http';
import { Board } from '../models/board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [ColumnService]
})
export class BoardComponent implements OnInit {

  columns: Column[] = [];
  board: Board = {
    boardId: 2,
    boardName: "string",
    column: [],
  };

  constructor (private columnService: ColumnService) {}
  
  ngOnInit(): void {
    this.getColumns();
  }
  
  public getColumns(): void {
    this.columnService.getColumns(this.board.boardId!).subscribe(
      (response: Column[]) => {
        this.columns = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  onCreateColumn(column: Column): void {

    console.log("banana ")
    console.log(column)

    this.columnService.createColumn(column).subscribe(
      (response: Column) => {
        console.log('Column created successfully:', response);
        this.getColumns();
      },
      (error) => {
        console.error('Error creating column:', error);
      }
    );


  }

  onDeleteColumn(column: Column): void {

    console.log("banana3");
    this.columnService.deleteColumn(column.columnId!).subscribe(
      (response: void) => {
        this.getColumns();
        console.log('Column successfully deleted:', response);
      },
      (error) => {
        console.error('Error deleting column:', error);
      }
    );
  }
}

