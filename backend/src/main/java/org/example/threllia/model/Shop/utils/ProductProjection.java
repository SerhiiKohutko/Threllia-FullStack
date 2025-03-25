package org.example.threllia.model.Shop.utils;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;

public interface ProductProjection {
    Long getId();
    String getName();
    String getImageUrl();
    @JsonIgnore
    LocalDate getDateAdded();
    Double getPrice();
}
