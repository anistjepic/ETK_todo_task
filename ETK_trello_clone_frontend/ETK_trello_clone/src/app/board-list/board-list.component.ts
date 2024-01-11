import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BoardService } from '../services/board.service';
import { Board } from '../models/board';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardComponent } from '../create-board/create-board.component';
import { FindBoardComponent } from '../find-board/find-board.component';
import { EditBoardComponent } from '../edit-board/edit-board.component';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css'],
  providers: [BoardService],
})
export class BoardListComponent implements OnInit {
  boards: Board[] = [];
  boardName: string = '';
  board?: Board;

  constructor(
    private boardService: BoardService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.boardService.getBoards().subscribe((boards: Board[]) => {
      this.boards = boards;
    });
  }

  onCreateBoard(createFlag: boolean) {
    if (createFlag) {
      this.addBoard();
    } else {
      console.error('Error creating new board');
    }
  }

  onFindBoard(findFlag: boolean) {
    if (findFlag) {
      const dialogRef = this.dialog
        .open(FindBoardComponent)
        .afterClosed()
        .subscribe((newBoard) => {
          if (newBoard != undefined && newBoard.boardName != '') {
            this.boardService.getBoardByName(newBoard.boardName).subscribe(
              (response: Board) => {
                console.log('Board found successfully:', response);
                this.boards = [response];
              },
              (error) => {
                console.error('Error finding board:', error);
                this.boards = [];
              }
            );
          } else this.getBoards();
        });
    }
  }

  getBoards(): void {
    this.boardService.getBoards().subscribe(
      (response: Board[]) => {
        this.boards = response;
        if (this.boards && this.boards.length > 0) {
          this.boardName = this.boards[0].boardName;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getBoardByBoardId(boardId: number): void {
    this.boardService.getBoardByBoardId(boardId).subscribe(
      (response: Board) => {
        this.board = response;
      },
      (error) => {
        console.error('Error fetching boards:', error);
      }
    );
  }

  onBoardClick(board: Board): void {
    this.router.navigate(['/board/', board.boardId]);
  }

  onDeleteClick(deleteBoard: Board) {
    if (deleteBoard.boardId) {
      this.boardService.deleteBoard(deleteBoard.boardId!).subscribe(
        (response: void) => {
          console.log('Board deleted successfully:', response);
          this.getBoards();
        },
        (error) => {
          console.error('Error deleting board:', error);
          this.getBoards();
        }
      );
    } else {
      console.error('Board is undefined.');
    }
  }

  onEditClick(clickedBoard: Board) {
    const dialogRef = this.dialog
      .open(EditBoardComponent, {
        data: this.board?.boardName,
      })
      .afterClosed()
      .subscribe((editBoard) => {
        if (editBoard != undefined && editBoard.boardName != '') {
          this.boardService
            .editBoardName(clickedBoard.boardName!, editBoard.boardName)
            .subscribe(
              (response: Board) => {
                console.log('Board edited successfully:', response);
                this.getBoards();
              },
              (error) => {
                console.error('Error editing board:', error);
              }
            );
        } else this.getBoards();
      });
  }

  addBoard() {
    const dialogRef = this.dialog
      .open(CreateBoardComponent)
      .afterClosed()
      .subscribe((newBoard) => {
        if (newBoard != undefined) {
          this.boardService.createBoard(newBoard).subscribe(
            (response: Board) => {
              console.log('Board created successfully:', response);
              this.getBoards();
            },
            (error) => {
              console.error('Error creating board:', error);
            }
          );
        } else {
          this.getBoards();
        }
      });
  }

  calculateFontSize(text: string): number {
    const maxLength = 10;
    const baseFontSize = 30;
    const fontSize = Math.max(baseFontSize - (text.length - maxLength) * 2, 20);
    return fontSize;
  }
}
