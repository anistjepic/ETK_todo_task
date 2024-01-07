package com.example.ETK_trello_clone_backend.repository;


import com.example.ETK_trello_clone_backend.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardRepo extends JpaRepository<Board, Long>  {
    Optional<Board> findByBoardName(String name);

}
