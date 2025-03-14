package org.example.threllia.model.Shop.entities;

import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.example.threllia.model.Shop.shop_enum.AccessoriesProductType;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class AccessoryProduct extends Product{
    private AccessoriesProductType type;
}
