package com.example.ETK_trello_clone_backend.controller;

import com.example.ETK_trello_clone_backend.model.Card;
import com.example.ETK_trello_clone_backend.model.Column;
import com.example.ETK_trello_clone_backend.services.ColumnServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/columns")
@CrossOrigin(origins = "http://localhost:4200")
public class ColumnController {

    private final ColumnServices columnService;

    @Autowired
    public ColumnController(ColumnServices columnService) {
        this.columnService = columnService;
    }

    @GetMapping("/getColumns/{boardId}")
    public ResponseEntity<Iterable<Column>> getAllColumns(@PathVariable("boardId") Long boardId) {
        Iterable<Column> columns = columnService.getAllColumns(boardId);
        return new ResponseEntity<>(columns, HttpStatus.OK);
    }

    @GetMapping("/{id}/cards")
    public ResponseEntity<List<Card>> getAllCardsFromColumn(@PathVariable("id") Long id) {
        List<Card> cards = columnService.getAllCards(id);
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }

    @GetMapping("/{status}")
    public ResponseEntity<List<Column>> getColumnsByStatus(@PathVariable("status") String status) {
        List<Column> columns = columnService.geColumnByStatus(status);
        return new ResponseEntity<>(columns, HttpStatus.OK);
    }

    @PostMapping("/createColumn")
    public ResponseEntity<Column> createNewColumn(@RequestBody Column column) {
        Column newColumn = columnService.createColumn(column);
        return new ResponseEntity<>(newColumn, HttpStatus.CREATED);
    }

    @PutMapping("/{columnId}")
    public ResponseEntity<?> updateColumn(@PathVariable("columnId") Long columnId, @RequestBody Column column) {
        if (!column.getColumnId().equals(columnId)) {
            return new ResponseEntity<>("Path variable columnId and column id do not match", HttpStatus.BAD_REQUEST);
        }
        Column updatedColumn = columnService.updateColumn(column);
        if (updatedColumn != null) {
            return new ResponseEntity<>(updatedColumn, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Unable to update task column", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/board/{boardId}")
    public ResponseEntity<Column> addColumnToBoard(@PathVariable("boardId") Long boardId, @RequestParam Long columnId) {
        Column updatedColumn = columnService.addColumnToBoard(columnId, boardId);
        return new ResponseEntity<>(updatedColumn, HttpStatus.OK);
    }

    @DeleteMapping("/{columnId}")
    public ResponseEntity<?> deleteColumn(@PathVariable("columnId") Long columnId) {
        columnService.deleteColumn(columnId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
