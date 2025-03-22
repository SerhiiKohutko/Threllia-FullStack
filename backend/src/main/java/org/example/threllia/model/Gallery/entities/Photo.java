package org.example.threllia.model.Gallery.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JoinColumn(name = "photo_collection_id")
    @JsonIgnore
    private PhotoCollection photoCollection;
    @ManyToOne
    @JoinColumn(name = "photographer_id")
    private Photographer author;
}
