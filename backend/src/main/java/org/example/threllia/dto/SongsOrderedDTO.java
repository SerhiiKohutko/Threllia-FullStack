package org.example.threllia.dto;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class SongsOrderedDTO {
    private Set<Character> characters;
    private List<SongDTO> songs;
}
