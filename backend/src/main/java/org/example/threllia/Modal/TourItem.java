package org.example.threllia.Modal;

import lombok.Data;

import java.util.Date;

@Data
public class TourItem {
    private long id;
    private Date date;
    private String country;
    private String city;
    private String place;
}
