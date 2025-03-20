package org.example.threllia.dto;

import lombok.Data;
import org.example.threllia.model.Song.entities.Song;

import java.util.List;
import java.util.Set;

@Data
public class SongsOrderedDTO {
    private Set<Character> characters;
    private List<Song> songs;
}
