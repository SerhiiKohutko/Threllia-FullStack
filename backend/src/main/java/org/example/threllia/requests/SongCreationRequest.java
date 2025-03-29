package org.example.threllia.requests;

import lombok.Data;

import java.util.Set;

@Data
public class SongCreationRequest {
    private String title;
    private String lyrics;
    private Set<String> authors;
}
