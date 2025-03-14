package org.example.threllia.Servicies;

import org.example.threllia.Modal.Gallery.GalleryItem;

import java.util.List;

public interface PhotoService {

    List<GalleryItem> getPhotos();
    GalleryItem getById(long id) throws Exception;
}
