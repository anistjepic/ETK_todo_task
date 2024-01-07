import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BoardService } from '../services/board.service';
import { Board } from '../models/board';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, NgFor, NgIf, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  boards!: Board[];
  boardName: string = "";
  showCreateForm: boolean = false;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {

  }

  createBoard(): void {
    const newBoard: Board = {
      boardName: this.boardName
    };

    this.boardService.createBoard(newBoard).subscribe(
      (response: Board) => {
        this.boards.push(response);
        console.log('Board created successfully:', response);
      },
      (error) => {
        console.error('Error creating board:', error);
      }
    );

    this.boardName = '';
    this.showCreateForm = false;
  }

  getBoardName(): string {
    return this.boardName;
  }

  cancelForm(): void {
    this.boardName = '';
    this.showCreateForm = false;
  }
}