package com.example.ETK_trello_clone_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@Table(name = "board")
@AllArgsConstructor
@NoArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long boardId;
    private String boardName;

    @JsonIgnore
    @ToString.Exclude
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<Column> columns = new ArrayList<>();

}
