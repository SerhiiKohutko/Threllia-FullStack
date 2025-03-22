package org.example.threllia.model.Gallery.service;

import org.example.threllia.model.Gallery.entities.PhotoCollection;
import org.example.threllia.model.Release.enums.SortingType;
import org.example.threllia.requests.PhotoCollectionCreationRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PhotoService {

    Page<PhotoCollection> getAllPhotosPaginated(int page, SortingType order);
    List<PhotoCollection> getPhotos();
    PhotoCollection getById(long id) throws Exception;
    PhotoCollection createGalleryItem(PhotoCollectionCreationRequest request, List<String> fileNames);
    PhotoCollection addPhotos(List<String> fileNames, String author, long id) throws Exception;
}
