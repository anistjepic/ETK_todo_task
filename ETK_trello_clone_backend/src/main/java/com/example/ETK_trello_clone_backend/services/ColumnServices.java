package com.example.ETK_trello_clone_backend.services;

import com.example.ETK_trello_clone_backend.NotFoundException;
import com.example.ETK_trello_clone_backend.model.Board;
import com.example.ETK_trello_clone_backend.model.Card;
import com.example.ETK_trello_clone_backend.model.Column;
//import com.example.ETK_trello_clone_backend.repository.BoardRepo;
//import com.example.ETK_trello_clone_backend.repository.ColumnRepo;
import com.example.ETK_trello_clone_backend.repository.BoardRepo;
import com.example.ETK_trello_clone_backend.repository.ColumnRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ColumnServices {
    private final ColumnRepo columnRepo;
    private final BoardRepo boardRepo;

    public Column createColumn (Column column) {
        Board board = column.getBoard();
        List<Column> columns = columnRepo.findByBoard(board);

        boolean noColumnWithSameName = columns.stream()
                .noneMatch(c -> c.getColumnStatus().equalsIgnoreCase(column.getColumnStatus()));

        if (noColumnWithSameName) {
            return columnRepo.save(column);
        } else {
            return column;
        }
    }

    public List<Column> geColumnByStatus (String status) {
        return columnRepo.findByColumnStatus(status)
                .orElseThrow(() -> new NotFoundException("Task column with status: " + status + " doesn't exist!"));
    }

    public Iterable<Column> getAllColumns (Long boardId) {
        Optional<Board> board = boardRepo.findById(boardId);
        // napravi exception ili nesto

        if(board != null) {
            List<Column> columns =  columnRepo.findByBoard(board.get());
            List<Column> returnColumns =  new ArrayList<>();
            for(Column c : columns) {
                Column column = Column.builder()
                        .columnId(c.getColumnId())
                        .columnTitle(c.getColumnTitle())
                        .columnStatus(c.getColumnStatus())
                        .build();
                returnColumns.add(column);
            }
            return returnColumns;
        }
        else {
            return new ArrayList<>();
        }

    }
    public Optional<Column> getColumnById(Long id) {
        return columnRepo.findById(id);
    }

    @PostMapping("/updateColumn")
    public Column updateColumn(@RequestBody Column column)
    {
        Optional<Column> oldColumn = columnRepo.findById(column.columnId);
        if (oldColumn.isEmpty()) {
            return null;
        }
        column.setBoard(oldColumn.get().getBoard());
        return columnRepo.save(column);
    }

    public void deleteColumn (Long id) {
        columnRepo.deleteById(id);
    }

    public List<Card> getAllCards(Long id) {
        Column taskColumn = columnRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Column with id: " + id + " not found"));
        return new ArrayList<>();
    }

    public Column addColumnToBoard(Long columnId, Long boardId) {
        Column taskColumn = columnRepo.findById(columnId)
                .orElseThrow(() -> new NotFoundException("Column with Id: " + columnId + " doesn't exist!"));
        Board board = boardRepo.findById(boardId)
                .orElseThrow(() -> new NotFoundException("Board with Id: " + boardId + " doesn't exist!"));
        taskColumn.setBoard(board);
        return columnRepo.save(taskColumn);
    }
}
