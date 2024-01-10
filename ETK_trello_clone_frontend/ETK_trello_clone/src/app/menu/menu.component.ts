import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ColumnService } from '../services/column.service';
import { Column } from '../models/column';
import { Card} from '../models/card';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Board } from '../models/board';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, FormsModule, NgIf, NgFor],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Input() board!: Board;
  @Output() onCreateColumn = new EventEmitter<Column>();
  column: Column[] = [];
  showCreateColumnForm: boolean = false;
  showFilterColumnForm: boolean = false;
  columnName!: string;
  columnStatus!: string;

  cards: Card[] = [];
  showCreateForm = false;
  cardName!: string;
  description!: string;
  cardOwner!: string;
  cardStatus?: string;

  constructor(private columnService: ColumnService,
    private router: Router) {}

  cancelForm(): void {
    this.columnName = '';
    this.columnStatus = "";
    this.showCreateColumnForm = false;
    this.showFilterColumnForm = false;
  }

  createColumn() {
    const newColumn: Column = {
      columnTitle: this.columnName,
      columnStatus: this.columnStatus,
      board: this.board
    };
    this.onCreateColumn.emit(newColumn);
    this.columnName = '';
    this.columnStatus = "";
    this.showCreateColumnForm = false;
  }
  
  filterColumn(columnStatus: string): void {
    this.columnService.filterByStatus(columnStatus).subscribe(
      (response: Column[]) => {
        this.column = response;
        console.log(response);    
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.showFilterColumnForm = false;
  }

  onClickGoBackToMainPage() {
    console.log('Clicked application name:');
    this.router.navigate(['/boards']);
    }
}