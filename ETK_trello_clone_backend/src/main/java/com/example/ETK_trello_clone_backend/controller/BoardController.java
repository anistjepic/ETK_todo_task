package com.example.ETK_trello_clone_backend.controller;

import com.example.ETK_trello_clone_backend.model.Board;
import com.example.ETK_trello_clone_backend.model.Card;
import com.example.ETK_trello_clone_backend.model.Column;
import com.example.ETK_trello_clone_backend.services.BoardServices;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {
    private final BoardServices boardService;


    @GetMapping()
    public ResponseEntity<Iterable<Board>> getAllBoards() {
        Iterable<Board> boards = boardService.getAllBoards();
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

    @GetMapping("/getBoard/{boardId}")
    public ResponseEntity<Board> getBoardById(@PathVariable("boardId") Long id) {
        Board board = boardService.getBoardByBoardId(id);
        if (board != null) {
            return new ResponseEntity<>(board, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/{name}")
    public ResponseEntity<Board> getBoardByName(@PathVariable("name") String name) {
        Board board = boardService.getBoardByBoardName(name);
        return new ResponseEntity<>(board, HttpStatus.OK);
    }

    @PostMapping("/createBoard")
    public ResponseEntity<Board> createNewBoard(@RequestBody Board board) {
        Board newBoard = boardService.createBoard(board);
        return new ResponseEntity<>(newBoard,HttpStatus.CREATED);
    }

    @PutMapping("/{boardId}")
    public ResponseEntity<?> updateBoard(@PathVariable("boardId") Long id, @RequestBody Board board) {
        if (!board.getBoardId().equals(id)) {
            return new ResponseEntity<>("Path variable boardId and board id do not match", HttpStatus.BAD_REQUEST);
        }
        Board updatedBoard = boardService.updateBoard(board);
        if (updatedBoard != null) {
            return new ResponseEntity<>(updatedBoard, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Unable to update board", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> deleteBoard(@PathVariable("boardId") Long id) {
        boardService.deleteBoard(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{boardId}/columns")
    public ResponseEntity<Iterable<Column>> getAllColumnsFromBoard(@PathVariable("boardId") Long id) {
        Iterable<Column> columns = boardService.getAllColumns(id);
        return new ResponseEntity<>(columns, HttpStatus.OK);
    }

    @GetMapping("/{boardId}/columns/{columnId}")
    public ResponseEntity<List<Card>> getAllColumnsFromBoard(@PathVariable("boardId") Long boardId, @PathVariable("columnId") Long columnId) {
        List<Card> cards = boardService.getAllCards(boardId, columnId);
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }
}
