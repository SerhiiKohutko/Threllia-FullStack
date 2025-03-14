package org.example.threllia.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.example.threllia.Modal.Gallery.Photo;

import java.util.Date;
import java.util.List;

@Data
public class GalleryItemCreationRequest {
    private String title;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private List<Photo> photos;
}
