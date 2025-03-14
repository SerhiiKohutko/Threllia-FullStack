package org.example.threllia.model.Gallery.service;

import org.example.threllia.model.Gallery.entities.GalleryItem;
import org.example.threllia.requests.GalleryItemCreationRequest;

import java.util.List;

public interface PhotoService {

    List<GalleryItem> getPhotos();
    GalleryItem getById(long id) throws Exception;
    GalleryItem createGalleryItem(GalleryItemCreationRequest request, List<String> fileNames);
    GalleryItem addPhotos(List<String> fileNames, String author, long id) throws Exception;
}
