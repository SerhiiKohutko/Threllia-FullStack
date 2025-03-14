package org.example.threllia.Modal.Shop.entities;

import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.example.threllia.Modal.Shop.shop_enum.MediaProductType;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class MediaProduct extends Product{
    private MediaProductType type;
}
