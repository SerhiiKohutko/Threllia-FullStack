package org.example.threllia.Modal.Gallery.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String imageName;

    @ManyToOne
    @JoinColumn(name = "gallery_item_id")
    private GalleryItem galleryItem;
    @ManyToOne
    @JoinColumn(name = "photographer_id")
    private Photographer author;
}
