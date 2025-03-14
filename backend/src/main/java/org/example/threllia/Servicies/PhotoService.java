package org.example.threllia.Servicies;

import org.example.threllia.Modal.Gallery.entities.GalleryItem;
import org.example.threllia.requests.GalleryItemCreationRequest;

import java.util.List;

public interface PhotoService {

    List<GalleryItem> getPhotos();
    GalleryItem getById(long id) throws Exception;
    GalleryItem createGalleryItem(GalleryItemCreationRequest request, List<String> fileNames);
}
