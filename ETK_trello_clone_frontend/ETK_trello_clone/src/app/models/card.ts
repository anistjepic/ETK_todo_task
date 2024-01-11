import { Column } from "./column";

export interface Card {
  cardId?: number;
  cardName: string;
  cardDescription: string;
  cardOwner: string;
  status: string;
  column: Column
}