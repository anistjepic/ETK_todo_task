package com.example.ETK_trello_clone_backend.repository;

import com.example.ETK_trello_clone_backend.model.Card;
import com.example.ETK_trello_clone_backend.model.Column;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepo extends JpaRepository<Card, Long> {

    List<Card> findByColumn(Column column);
}
