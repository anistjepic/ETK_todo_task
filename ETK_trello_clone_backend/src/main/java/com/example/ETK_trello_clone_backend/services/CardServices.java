package com.example.ETK_trello_clone_backend.services;

import com.example.ETK_trello_clone_backend.NotFoundException;
import com.example.ETK_trello_clone_backend.model.Card;
import com.example.ETK_trello_clone_backend.model.Column;
import com.example.ETK_trello_clone_backend.repository.CardRepo;
import com.example.ETK_trello_clone_backend.repository.ColumnRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CardServices {
    private final CardRepo cardRepo;
    private final ColumnRepo columnRepo;

    public Card createNewCard(Card card) {
        if (card.getCardId() != null) {
            Column column = columnRepo.findByColumnStatus(card.getStatus()).get();
            Card existingCard = cardRepo.findById(card.getCardId()).get();
            existingCard.setCardDescription(card.getCardDescription());
            existingCard.setCardName(card.getCardName());
            existingCard.setCardOwner(card.getCardOwner());
            existingCard.setStatus(card.getStatus());
            existingCard.setColumn(column);
            cardRepo.save(existingCard);
        } else {
            try {
                cardRepo.save(card);
            } catch (Exception e) {
                System.out.println(e);
            }
        }
        return card;
    }

    public Card updateCard(Card card) {
        return cardRepo.save(card);
    }

    public Iterable<Card> getAllCards(Long columnId) {
        Column column = columnRepo.findById(columnId).orElse(null);
        if (column != null) {
            List<Card> cards = cardRepo.findByColumn(column);
            List<Card> returnCards = new ArrayList<>();
            for (Card c : cards) {
                Card card = Card.builder()
                        .cardId(c.getCardId())
                        .cardName(c.getCardName())
                        .cardDescription(c.getCardDescription())
                        .cardOwner(c.getCardOwner())
                        .status(c.getStatus())
                        .build();
                returnCards.add(card);
            }
            return returnCards;
        } else {
            return new ArrayList<>();
        }
    }

    public Card getCardByCardName(String name) {
        return cardRepo.findByCardName(name)
                .orElseThrow(() -> new NotFoundException("Card with name: " + name + " doesn't exist!"));
    }

    public List<Card> getCardsByOwner(String cardOwner) {
        return cardRepo.findByCardOwner(cardOwner)
                .orElseThrow(() -> new NotFoundException("Card with owner: " + cardOwner + " doesn't exist!"));
    }

    public List<Card> getCardsByStatus(String status) {
        return cardRepo.findByStatus(status)
                .orElseThrow(() -> new NotFoundException("Card with state: " + status + " doesn't exist!"));
    }

    public void deleteCard(Long id) {
        cardRepo.deleteById(id);
    }

    public Card addCardToColumn(Long cardId, Long columnId) {
        Card card = cardRepo.findById(cardId)
                .orElseThrow(() -> new NotFoundException("Card with Id: " + cardId.toString() + " doesn't exist!"));
        Column column = columnRepo.findById(columnId)
                .orElseThrow(() -> new NotFoundException("Column with Id: " + columnId.toString() + " doesn't exist!"));
        card.setColumn(column);
        card.setStatus("");
        return cardRepo.save(card);
    }
}
