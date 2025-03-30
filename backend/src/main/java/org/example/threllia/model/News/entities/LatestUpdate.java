package org.example.threllia.model.News.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.example.threllia.utils.FileUploader;

import java.io.IOException;
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
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateCreated = LocalDate.now();
    private String title;

    @Lob
    private String content;

    private String imageName;

    @PreRemove
    public void deleteImage() throws IOException {
        FileUploader.removeLatestUpdateImage(imageName);
    }
}
