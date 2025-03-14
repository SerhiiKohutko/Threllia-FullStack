package org.example.threllia.Modal.News;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class LatestUpdate {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Builder.Default
    private LocalDate dateCreated = LocalDate.now();
    private String title;

    @Lob
    private String content;

    private String imageName;
}
