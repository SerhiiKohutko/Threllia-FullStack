package org.example.threllia.Modal.Shop.entities;

import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.example.threllia.Modal.Shop.shop_enum.AccessoriesProductType;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class AccessoryProduct extends Product{
    private AccessoriesProductType type;
}
