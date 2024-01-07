package com.example.ETK_trello_clone_backend.services;


import com.example.ETK_trello_clone_backend.NotFoundException;
import com.example.ETK_trello_clone_backend.model.Board;
import com.example.ETK_trello_clone_backend.model.Card;
import com.example.ETK_trello_clone_backend.model.Column;
//import com.example.ETK_trello_clone_backend.repository.BoardRepo;
import com.example.ETK_trello_clone_backend.repository.BoardRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServices {


    private final BoardRepo boardRepo;

    public Board createBoard(Board board) { return boardRepo.save(board); }

    public Iterable<Board> getAllBoards() { return boardRepo.findAll(); }

    public Board updateBoard(Board board) {
        return boardRepo.save(board);
    }

    public void deleteBoard(Long id) { boardRepo.deleteById(id); }

    public Board getBoardByBoardName(String name) {
        return boardRepo.findByBoardName(name)
                .orElseThrow(() -> new NotFoundException("Board with name: " + name + " doesn't exist!"));
    }

    public List<Column> getAllColumns(Long id) {
        Board board = boardRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Board with id: " + id.toString() + " not found"));
        return new ArrayList<>();
    }

    public List<Card> getAllCards(Long boardId, Long taskColumnId) {
//        Board board = boardRepo.findById(boardId)
//                .orElseThrow(() -> new NotFoundException("Board with id: " + boardId.toString() + " not found"));
//        List<Card> cards = new ArrayList<>();
//        for (Column taskColumn:board.getColumns()) {
//            if (taskColumn.getColumnId().equals(taskColumnId)) {
//                cards.addAll(taskColumn.getCards());
//            }
//        }
//        return cards;
        return new ArrayList<>();
    }
}
