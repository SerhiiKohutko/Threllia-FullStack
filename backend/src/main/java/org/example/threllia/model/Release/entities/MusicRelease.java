package org.example.threllia.model.Release.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.example.threllia.model.Song.entities.Song;

import java.util.Date;
import java.util.List;
import java.util.Map;

@EqualsAndHashCode
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MusicRelease {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String title;
    private String description;
    private String coverName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateReleased;


    @ManyToMany
    @JoinTable(name = "releases_song",
                joinColumns = @JoinColumn(name = "release_id"),
                inverseJoinColumns = @JoinColumn(name = "song_id"))
    @OrderColumn(name = "song_order")
    private List<Song> trackList;

    @ElementCollection
    @MapKeyColumn(name = "name")
    @Column(name = "instruments")
    @CollectionTable(name = "members", joinColumns = @JoinColumn(name = "id"))
    private Map<String, String> nameToInstrumentsPlayed;

}

