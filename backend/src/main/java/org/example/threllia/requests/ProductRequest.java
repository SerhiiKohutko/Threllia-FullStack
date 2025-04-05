package org.example.threllia.requests;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.example.threllia.model.Shop.entities.Product;
import org.example.threllia.model.Shop.shop_enum.ProductType;
import org.example.threllia.model.Shop.shop_enum.AccessoriesProductType;
import org.example.threllia.model.Shop.shop_enum.ApparelProductType;
import org.example.threllia.model.Shop.shop_enum.ApparelSizeType;
import org.example.threllia.model.Shop.shop_enum.MediaProductType;

import java.util.HashMap;

@EqualsAndHashCode(callSuper = true)
@Data
public class ProductRequest extends Product {
    private ProductType type;

    private MediaProductType mediaProductType;
    private AccessoriesProductType accessoriesProductType;
    private ApparelProductType apparelProductType;
    private HashMap<ApparelSizeType, Integer> sizes = new HashMap<>();
}
