package org.example.threllia.model.Shop.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long globalId;
    private Long id;
    private String name;
    private String imageUrl;
    private Double price;
    @JsonIgnore
    private Date dateAdded;
    private Integer totalQuantity;
    private String productType;
}
