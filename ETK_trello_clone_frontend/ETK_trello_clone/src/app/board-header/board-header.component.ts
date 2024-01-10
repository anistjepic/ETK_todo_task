import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BoardService } from '../services/board.service';
import { Board } from '../models/board';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-board-header',
    standalone: true,
    imports: [MatButtonModule, NgFor, NgIf, FormsModule],
    templateUrl: './board-header.component.html',
    styleUrl: './board-header.component.css'
})
export class BoardHeaderComponent implements OnInit {
    @Input() boardName!: string;
    showCreateForm: boolean = false;

    constructor(private boardService: BoardService) { }

    ngOnInit(): void {

    }

    cancelForm(): void {
        this.boardName = this.boardName;
        this.showCreateForm = false;
    }
}