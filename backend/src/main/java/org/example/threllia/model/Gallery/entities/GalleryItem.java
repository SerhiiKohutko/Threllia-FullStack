package org.example.threllia.model.Gallery.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class GalleryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private Date date;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "galleryItem")
    List<Photo> photos = new ArrayList<>();
}
