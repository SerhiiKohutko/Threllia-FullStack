package org.example.threllia.utils;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ParametersTransfer {
    private String album;
    private Double minPrice;
    private Double maxPrice;
    private int page;
}
