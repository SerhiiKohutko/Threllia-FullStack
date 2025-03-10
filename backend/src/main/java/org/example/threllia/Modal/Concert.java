package org.example.threllia.Modal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import org.example.threllia.Enums.ConcertStatus;

import java.time.LocalDate;

@Entity
@Data
public class Concert {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private LocalDate date;
    private String country;
    private String city;
    private String place;
    private ConcertStatus status;
}
