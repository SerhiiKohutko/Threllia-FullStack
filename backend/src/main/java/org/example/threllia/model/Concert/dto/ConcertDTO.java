package org.example.threllia.model.Concert.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class ConcertDTO {
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private String country;
    private String city;
    private String place;
    private String relatedTour;

    private List<String> songsList = new ArrayList<>();
}
