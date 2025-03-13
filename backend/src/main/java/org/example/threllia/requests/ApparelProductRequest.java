package org.example.threllia.requests;

import lombok.Data;
import org.example.threllia.Modal.Shop.shop_enum.ApparelSizeType;

@Data
public class ApparelProductRequest extends ProductRequest {
    private ApparelSizeType size;
}
