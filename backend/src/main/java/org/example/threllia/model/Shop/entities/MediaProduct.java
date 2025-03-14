package org.example.threllia.model.Shop.entities;

import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.example.threllia.model.Shop.shop_enum.MediaProductType;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class MediaProduct extends Product{
    private MediaProductType type;
}
