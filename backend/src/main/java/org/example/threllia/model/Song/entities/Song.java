package org.example.threllia.model.Song.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.example.threllia.model.Concert.entities.Concert;

import java.util.List;

@Entity
@Data
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String title;

    private String album;
    private String lyrics;

    @ManyToMany(mappedBy = "songsList")
    @JsonIgnore
    private List<Concert> concertPlayed;
}
