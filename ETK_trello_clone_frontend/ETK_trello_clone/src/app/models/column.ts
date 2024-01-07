import { Board } from "./board";
import { Card } from "./card";

export interface Column {
  columnId?: number;
  columnTitle: string;
  columnStatus: string;
  board: Board;
  cards?: Card[];
}
