package org.example.threllia.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class GalleryItemCreationRequest {
    private String title;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private String author;
}
