package org.example.threllia.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class PhotoCollectionCreationRequest {
    private String title;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private String author;
    private Set<Long> photos;
}
