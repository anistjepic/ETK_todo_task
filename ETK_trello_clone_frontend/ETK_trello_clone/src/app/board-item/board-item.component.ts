import { Component, OnInit } from '@angular/core';
import { ColumnService } from '../services/column.service';
import { Column } from '../models/column';
import {HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.css'],
  providers: [ColumnService]
})
export class BoardItemComponent implements OnInit {

  Columns: Column[] = [];

  constructor (private ColumnService: ColumnService) {}
  
  ngOnInit(): void {
    // this.getColumns();
  }
  
  // public getColumns(): void {
  //   this.ColumnService.getColumns().subscribe(
  //     (response: Column[]) => {
  //       this.Columns = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  // onColumnDeleted(deletedColumn: Column): void {
  //   this.Columns = this.Columns.filter(column => column.columnId !== deletedColumn.columnId);
  // }
}

