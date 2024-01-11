package com.example.ETK_trello_clone_backend.repository;

import com.example.ETK_trello_clone_backend.model.Board;
import com.example.ETK_trello_clone_backend.model.Column;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ColumnRepo extends JpaRepository<Column, Long> {

    List<Column> findByBoard(Board board);

    Optional<Column> findByColumnStatus(String status);
}
