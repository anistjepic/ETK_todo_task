import { Component, OnInit } from '@angular/core';
import { ColumnService } from '../services/column.service';
import { Column } from '../models/column';
import { Board } from '../models/board';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.css'],
  providers: [ColumnService]
})
export class BoardItemComponent implements OnInit {

  Boards: Board[] = [];

  constructor(private columnService: ColumnService) {}

  ngOnInit(): void {

  }
}

