package org.example.threllia.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@ToString
public class ReleaseRequest {
    private String title;
    private String description;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateReleased;
    private List<String> songList;
    private Map<String, String> nameToInstrumentsPlayed;
}
