package org.example.threllia.Modal.Gallery;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String author;
    private String imageName;
    @ManyToOne
    @JoinColumn(name = "id")
    private GalleryItem galleryItem;
}
