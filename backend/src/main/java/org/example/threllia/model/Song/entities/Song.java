package org.example.threllia.model.Song.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.example.threllia.model.Concert.entities.Concert;
import org.example.threllia.model.Release.entities.MusicRelease;

import java.util.List;
import java.util.Set;

@EqualsAndHashCode
@Entity
@Data
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String title;

    @Lob
    private String lyrics;

    @ManyToMany(mappedBy = "songsList")
    @JsonIgnore
    private List<Concert> concertPlayed;

    @ManyToMany(mappedBy = "trackList")
    @JsonIgnore
    private Set<MusicRelease> appearedOn;
}
