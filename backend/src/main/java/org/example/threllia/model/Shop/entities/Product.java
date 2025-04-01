package org.example.threllia.model.Shop.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.example.threllia.utils.FileUploader;

import java.io.IOException;
import java.time.LocalDate;

@MappedSuperclass
@Data
@SuperBuilder
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    @JsonIgnore
    private LocalDate dateAdded;

    private String imageUrl;
    private Double price;
    private String description;
    private int totalQuantity;

    @PreRemove
    public void removeProductImage() throws IOException {
        FileUploader.removeProductImage(imageUrl);
    }
}
