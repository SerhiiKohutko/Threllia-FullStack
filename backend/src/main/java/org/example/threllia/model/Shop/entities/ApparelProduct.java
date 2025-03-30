package org.example.threllia.model.Shop.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;
import org.example.threllia.model.Shop.shop_enum.ApparelProductType;
import org.example.threllia.model.Shop.shop_enum.ApparelSizeType;
import org.example.threllia.requests.ProductRequest;

import java.util.HashMap;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@SuperBuilder
@AllArgsConstructor
public class ApparelProduct extends Product{

    @ElementCollection
    @MapKeyColumn(name="size")
    @Column(name = "quantity")
    @CollectionTable(name="size_quantity", joinColumns=@JoinColumn(name="id"))
    private Map<ApparelSizeType, Integer> sizeToQuantityMap;

    private ApparelProductType type;

    public ApparelProduct(){
        sizeToQuantityMap = new HashMap<>();
        for (ApparelSizeType key : ApparelSizeType.values()){
            sizeToQuantityMap.putIfAbsent(key, 0);
        }
    }


    public int calculateTotalQuantity(ProductRequest request){
        int totalQuantity = 0;
        for (Map.Entry<ApparelSizeType, Integer> el : request.getMap().entrySet()){
            this.getSizeToQuantityMap().put(el.getKey(), el.getValue());
            totalQuantity += el.getValue();
        }

        return totalQuantity;
    }
}
