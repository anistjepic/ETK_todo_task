import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse } from '@angular/common/http';
import { BoardService } from '../services/board.service';
import { Board } from '../models/board';
import { BoardSharedService } from '../services/board-shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css'],
  providers: [BoardService],
})
export class BoardListComponent implements OnInit {

  boards: Board[] = [];
  boardName: string = "";
  board?: Board;
  newBoard: Board | null = null;

  constructor (private boardSharedService: BoardSharedService,
    private boardService: BoardService,
    private router: Router) {}
  
  ngOnInit(): void {
    console.log("board-list");
    // this.boardSharedService.newBoard$.subscribe((board: Board | null) => {
    //   this.newBoard = board;
    // });

    this.boardService.getBoards().subscribe((boards: Board[]) => {
      this.boards = boards;
    });
  }

  getBoards(): void {
    console.log("getBoards(iz board-list)")
    this.boardService.getBoards().subscribe(
      (response: Board[]) => {
        this.boards = response;
        console.log('Boards:', this.boards);
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

  // onCreateBoard(board: Board): void {
  //   console.log("novo board: ", board);

  //   this.boardService.createBoard(board).subscribe(
  //     (response: Board) => {
  //       console.log('Board created successfully:', response);
  //       this.getBoardByBoardId(board.boardId!);
  //     },
  //     (error) => {
  //       console.error('Error creating board:', error);
  //     }
  //   );
  // }

  onBoardClick(board: Board): void {
    console.log('Clicked board:', board);
    this.router.navigate(['/board/', board.boardId]);
  }

  onDeleteClick(_t11: Board) {
    throw new Error('Method not implemented.');
    }
    onEditClick(_t11: Board) {
    throw new Error('Method not implemented.');
    }
  
    onAddBoardClick() {
      throw new Error('Method not implemented.');
      }
}