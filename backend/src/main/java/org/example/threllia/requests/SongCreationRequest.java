package org.example.threllia.requests;

import lombok.Data;

@Data
public class SongCreationRequest {
    private String title;
    private String lyrics;
}
