package org.example.threllia.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

//TODO - refactor concert instead date
@Data
public class SongDTO {
    private long id;
    private String title;
    private String lyrics;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate firstTimePlayed;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastTimePlayed;

    private Set<MusicReleaseDTO> appearedOn;
}
