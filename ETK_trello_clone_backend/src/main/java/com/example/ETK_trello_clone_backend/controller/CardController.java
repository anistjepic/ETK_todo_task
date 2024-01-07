package com.example.ETK_trello_clone_backend.controller;

import com.example.ETK_trello_clone_backend.model.Card;
import com.example.ETK_trello_clone_backend.services.CardServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cards")
@CrossOrigin(origins = "http://localhost:4200")
public class CardController {
    private final CardServices cardService;

    @Autowired
    public CardController(CardServices cardService) {
        this.cardService = cardService;
    }

    @GetMapping("/getCards/{columnId}")
    public ResponseEntity<Iterable<Card>> getAllCards(@PathVariable("columnId") Long columnId) {
        Iterable<Card> cards = cardService.getAllCards(columnId);
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }

    @GetMapping("/{name}")
    public ResponseEntity<Card> getCardByCardName(@PathVariable("name") String name) {
        Card card = cardService.getCardByCardName(name);
        return new ResponseEntity<>(card, HttpStatus.OK);
    }

    @GetMapping("/{owner}")
    public ResponseEntity<List<Card>> getCardsByOwner(@PathVariable("owner") String owner) {
        List<Card> cards = cardService.getCardsByOwner(owner);
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }

    @GetMapping("/{state}")
    public ResponseEntity<List<Card>> getCardsByStatus(@PathVariable("status") String status) {
        List<Card> cards = cardService.getCardsByStatus(status);
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Card> createNewCard(@RequestBody Card card) {
        Card newCard = cardService.createNewCard(card);
        return new ResponseEntity<>(newCard, HttpStatus.CREATED);
    }

    @PutMapping("/{cardId}")
    public ResponseEntity<?> updateCard(@PathVariable("cardId") Long cardId, @RequestBody Card card) {
        if (!card.getCardId().equals(cardId)) {
            return new ResponseEntity<>("Path variable cardId and card id do not match", HttpStatus.BAD_REQUEST);
        }
        Card updatedCard = cardService.updateCard(card);
        if (updatedCard != null) {
            return new ResponseEntity<>(updatedCard, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Unable to update card", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/taskColumn/{taskColumnId}")
    public ResponseEntity<Card> addCardToColumn(@PathVariable("columnId") Long columnId, @RequestParam Long cardId) {
        Card updatedCard = cardService.addCardToColumn(cardId, columnId);
        return new ResponseEntity<>(updatedCard, HttpStatus.OK);
    }

    @DeleteMapping("/{cardId}")
    public ResponseEntity<?> deleteCard(@PathVariable("cardId") Long cardId) {
        cardService.deleteCard(cardId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
