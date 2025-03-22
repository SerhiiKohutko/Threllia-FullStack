package org.example.threllia.model.Gallery.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class PhotoCollection {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    @JsonFormat(pattern = "yyyy-MM-d")
    private Date date;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "photoCollection")
    List<Photo> photos = new ArrayList<>();
}
