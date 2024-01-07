import { Column } from "./column";

export interface Board {
    boardId?: number;
    boardName: string;
    column?: Column[];
}