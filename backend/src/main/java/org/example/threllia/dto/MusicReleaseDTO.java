package org.example.threllia.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;
import java.util.List;
import java.util.Map;

@EqualsAndHashCode
@Data
public class MusicReleaseDTO {
    private long id;
    private String title;
    private String description;
    private String coverName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateReleased;

    private List<String> trackList;
    private Map<String, String> nameToInstrumentsPlayed;
}
