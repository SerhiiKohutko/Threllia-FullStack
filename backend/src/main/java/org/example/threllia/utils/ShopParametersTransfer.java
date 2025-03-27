package org.example.threllia.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.threllia.model.Shop.shop_enum.ShopSortingType;

@AllArgsConstructor
@Data
public class ShopParametersTransfer {
    private String album;
    private Double minPrice;
    private Double maxPrice;
    private int page;
    private int size;
    private ShopSortingType sortingType;
}
