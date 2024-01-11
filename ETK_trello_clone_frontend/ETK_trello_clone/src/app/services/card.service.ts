import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardsUrl = environment.apiUrl + "/cards";

  constructor(private http: HttpClient) { }

  getCards(columnId: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.cardsUrl}/getCards/${columnId}`);
  }

  createCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.cardsUrl, card);
  }

  deleteCard(cardId: number): Observable<void> {
    return this.http.delete<void>(`${this.cardsUrl}/${cardId}`);
  }

  editCard(card: Card): Observable<Card> {
    return this.http.put<Card>(`${this.cardsUrl}/${card.cardId}`, card);
  }
}