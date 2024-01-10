import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ColumnComponent } from './column/column.component';
import { CardComponent } from './card/card.component';
import { BoardComponent } from './board/board.component';
import { AppRoutingModule } from './app.routing.module';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardItemComponent } from './board-item/board-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainHeaderComponent } from './main-header/main-header.component';
import { BoardHeaderComponent } from './board-header/board-header.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { CreateBoardComponent } from './create-board/create-board.component';
import { BoardSharedService } from './services/board-shared.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardListComponent,
    BoardItemComponent
    ],
  imports: [
    BrowserModule,
    CardComponent,
    ColumnComponent,
    MenuComponent,
    CreateCardComponent,
    CreateBoardComponent,
    BoardHeaderComponent,
    MainHeaderComponent,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [BoardSharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }