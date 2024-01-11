package com.example.ETK_trello_clone_backend.services;

import com.example.ETK_trello_clone_backend.NotFoundException;
import com.example.ETK_trello_clone_backend.model.Board;
import com.example.ETK_trello_clone_backend.model.Card;
import com.example.ETK_trello_clone_backend.model.Column;
import com.example.ETK_trello_clone_backend.repository.BoardRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServices {
    private final BoardRepo boardRepo;

    public Board createBoard(Board board) {
        return boardRepo.save(board);
    }

    public Iterable<Board> getAllBoards() {
        List<Board> board = boardRepo.findAll();
        if(board.isEmpty()) {
            return new ArrayList<>();
        }
        return board;
    }

    public Board updateBoard(Board board) {
        return boardRepo.save(board);
    }

    public void deleteBoard(Long id) { boardRepo.deleteById(id); }

    public Board getBoardByBoardId(Long id) {
        return boardRepo.findByBoardId(id)
                .orElseThrow(() -> new NotFoundException("Board with id: " + id + " doesn't exist!"));
    }

    public Board getBoardByBoardName(String name) {
//        boolean ifBoardDontExists = checkIfBoardNameExists(name);
        if (!checkIfBoardNameExists(name)) {
            return boardRepo.findByBoardName(name)
                    .orElseThrow(() -> new NotFoundException("Board with name: " + name + " doesn't exist!"));
        }
        return null;
    }

    public Board editBoardName(String oldName, String newName) {
        Board board =  boardRepo.findByBoardName(oldName).get();
        board.setBoardName(newName);
        boardRepo.save(board);
        return board;
    }

    public List<Column> getAllColumns(Long id) {
        Board board = boardRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Board with id: " + id.toString() + " not found"));
        return new ArrayList<>();
    }

    public List<Card> getAllCards(Long boardId, Long taskColumnId) {
        return new ArrayList<>();
    }

    public boolean checkIfBoardNameExists(String boardName) {
        List<Board> boards = boardRepo.findAll();
        return boards.stream()
                .noneMatch(b -> b.getBoardName().equalsIgnoreCase(boardName));
    }
}