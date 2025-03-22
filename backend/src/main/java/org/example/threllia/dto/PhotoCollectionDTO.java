package org.example.threllia.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class PhotoCollectionDTO {
    private long id;
    private String title;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private String firstElementPhotoName;
}
