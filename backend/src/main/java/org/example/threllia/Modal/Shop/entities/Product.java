package org.example.threllia.Modal.Shop.entities;

import jakarta.persistence.*;
import lombok.Data;

@MappedSuperclass
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String imageUrl;
    private double price;
    private String description;
    private int totalQuantity;
}
