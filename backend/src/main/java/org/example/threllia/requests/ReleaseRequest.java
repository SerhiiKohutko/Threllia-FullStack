package org.example.threllia.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.Map;
import java.util.Set;

@Data
public class ReleaseRequest {
    private String title;
    private String description;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateReleased;
    private Set<String> songList;
    private Map<String, String> nameToInstrumentsPlayed;
}
