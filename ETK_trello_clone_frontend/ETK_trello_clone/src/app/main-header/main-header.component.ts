import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BoardService } from '../services/board.service';
import { Board } from '../models/board';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateBoardComponent } from '../create-board/create-board.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BoardSharedService } from '../services/board-shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [MatButtonModule, NgFor, NgIf, FormsModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css'
})
export class MainHeaderComponent implements OnInit {

  @Output() onCreateBoard = new EventEmitter<Board>();
  
  boards: Board[] = [];
  boardName: string = '';
  boardCreatedSubscription: Subscription | undefined;

  constructor( private boardSharedService: BoardSharedService,
    private boardService: BoardService,
    public dialog: MatDialog,
    private router: Router) {}

  ngOnInit(): void {}

  addBoard(): void {
    const dialogRef = this.dialog.open(CreateBoardComponent, {
      data: this.boards
    });

    dialogRef.componentInstance.showCreateForm = true;
    this.boardCreatedSubscription = dialogRef.componentInstance.boardCreated.subscribe((newBoard: Board) => {
        this.boards.push(newBoard);
        this.boardSharedService.emitNewBoard(newBoard);
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
            this.getBoardName();
      }
    });
    
  }

  ngOnDestroy(): void {
    if (this.boardCreatedSubscription) {
      this.boardCreatedSubscription.unsubscribe();
    }
  }
  
  getBoardName(): string {
    return this.boardName;
  }

  onClickGoBackToMainPage() {
    console.log('Clicked application name:');
    this.router.navigate(['/boards']);
    }
}