import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Board } from '../models/board';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [MatButtonModule, NgFor, NgIf, FormsModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css'
})
export class MainHeaderComponent implements OnInit {

  @Output() onCreateBoard = new EventEmitter<boolean>();
  @Output() onFindBoard = new EventEmitter<boolean>();


  boards: Board[] = [];
  boardName: string = '';
  boardCreatedSubscription: Subscription | undefined;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  addBoard(): void {
    this.onCreateBoard.emit(true);
  }

  findBoard(): void {
    this.onFindBoard.emit(true);
  }
}