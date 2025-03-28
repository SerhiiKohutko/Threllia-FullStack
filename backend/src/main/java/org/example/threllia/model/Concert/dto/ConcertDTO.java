package org.example.threllia.model.Concert.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
public class ConcertDTO {
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private String country;
    private String city;
    private String place;
    private String relatedTour;

    private Set<String> songsList = new HashSet<>();
}
