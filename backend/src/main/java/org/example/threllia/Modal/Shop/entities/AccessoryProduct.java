package org.example.threllia.Modal.Shop.entities;

import jakarta.persistence.Entity;
import lombok.Data;
import org.example.threllia.Modal.Shop.shop_enum.AccessoriesProductType;

@Entity
@Data
public class AccessoryProduct extends Product{
    private AccessoriesProductType type;
}
