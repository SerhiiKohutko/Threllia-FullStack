package org.example.threllia.Modal.Shop.entities;

import jakarta.persistence.Entity;
import lombok.Data;
import org.example.threllia.Modal.Shop.shop_enum.MediaProductType;

@Entity
@Data
public class MediaProduct extends Product{
    private MediaProductType type;
}
