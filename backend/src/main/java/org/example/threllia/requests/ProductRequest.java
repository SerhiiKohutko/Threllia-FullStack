package org.example.threllia.requests;

import lombok.Data;
import org.example.threllia.Enums.ProductType;
import org.example.threllia.Modal.Shop.entities.Product;
import org.example.threllia.Modal.Shop.shop_enum.AccessoriesProductType;
import org.example.threllia.Modal.Shop.shop_enum.ApparelProductType;
import org.example.threllia.Modal.Shop.shop_enum.ApparelSizeType;
import org.example.threllia.Modal.Shop.shop_enum.MediaProductType;

import java.util.HashMap;

@Data
public class ProductRequest extends Product {
    private ProductType type;
    private MediaProductType mediaProductType;
    private ApparelProductType apparelProductType;
    private AccessoriesProductType accessoriesProductType;
    private HashMap<ApparelSizeType, Integer> map;
}
