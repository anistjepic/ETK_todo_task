package com.example.ETK_trello_clone_backend.repository;

import com.example.ETK_trello_clone_backend.model.Card;
import com.example.ETK_trello_clone_backend.model.Column;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepo extends JpaRepository<Card, Long> {
    Optional<Card> findByCardName(String name);

    List<Card> findByColumn(Column column);
    Optional<List<Card>> findByCardOwner(String name);

    Optional<List<Card>> findByStatus(String status);
}
