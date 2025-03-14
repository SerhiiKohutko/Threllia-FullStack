package org.example.threllia.Servicies;

import org.example.threllia.Modal.Gallery.entities.GalleryItem;
import org.example.threllia.Modal.Gallery.entities.Photo;
import org.example.threllia.Modal.Gallery.entities.Photographer;
import org.example.threllia.Modal.Gallery.service.PhotographerService;
import org.example.threllia.Repositories.PhotoRepository;
import org.example.threllia.requests.GalleryItemCreationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoServiceImpl implements PhotoService{

    @Autowired
    private PhotoRepository photoRepository;
    @Autowired
    private PhotographerService photographerService;

    @Override
    public List<GalleryItem> getPhotos() {
        return photoRepository.findAll();
    }

    @Override
    public GalleryItem getById(long id) throws Exception {
        return photoRepository.findGalleryItemById(id).orElseThrow(() -> new Exception("GalleryItem not found with id = " + id));
    }


    @Override
    public GalleryItem createGalleryItem(GalleryItemCreationRequest request, List<String> fileNames) {
        Photographer author = photographerService.getPhotographer(request.getAuthor().trim());

        GalleryItem newGalleryItem = new GalleryItem();
        newGalleryItem.setTitle(request.getTitle());
        newGalleryItem.setDate(request.getDate());

        for (String fileName : fileNames) {
            Photo newPhoto = new Photo();
            newPhoto.setAuthor(author);
            newPhoto.setImageName(fileName);
            newGalleryItem.getPhotos().add(newPhoto);
        }

        return photoRepository.save(newGalleryItem);
    }
}
