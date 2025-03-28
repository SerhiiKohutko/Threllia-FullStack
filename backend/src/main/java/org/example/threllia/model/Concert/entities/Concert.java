package org.example.threllia.model.Concert.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.example.threllia.model.Concert.concert_enum.ConcertStatus;
import org.example.threllia.model.Song.entities.Song;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Concert {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private String country;
    private String city;
    private String place;
    private String relatedTour;
    private ConcertStatus status;

    @ManyToMany()
    @JoinTable(name = "concert_song_list",
            joinColumns = @JoinColumn(name = "concert_id"),
            inverseJoinColumns = @JoinColumn(name = "song_id"))
    private Set<Song> songsList = new HashSet<>();
}
