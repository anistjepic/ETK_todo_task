package com.example.ETK_trello_clone_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "column")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Column {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long columnId;
    private String columnTitle;

    private String columnStatus;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @ToString.Exclude
    @OneToMany(mappedBy = "column", cascade = CascadeType.ALL)
    private List<Card> cards = new ArrayList<>();
}
