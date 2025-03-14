package org.example.threllia.model.Gallery.service;

import org.example.threllia.model.Gallery.entities.GalleryItem;
import org.example.threllia.model.Gallery.entities.Photo;
import org.example.threllia.model.Gallery.entities.Photographer;
import org.example.threllia.model.Gallery.repository.PhotoRepository;
import org.example.threllia.requests.GalleryItemCreationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoServiceImpl implements PhotoService {

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

        addAllPhotosToGalleryItem(fileNames, author, newGalleryItem);

        return photoRepository.save(newGalleryItem);
    }

    @Override
    public GalleryItem addPhotos(List<String> fileNames, String author, long id) throws Exception {
        GalleryItem item = getById(id);
        Photographer photographer = photographerService.getPhotographer(author.trim());
        addAllPhotosToGalleryItem(fileNames, photographer, item);
        return photoRepository.save(item);
    }

    private void addAllPhotosToGalleryItem(List<String> fileNames, Photographer author, GalleryItem item){
        for (String fileName : fileNames) {
            Photo newPhoto = new Photo();
            newPhoto.setGalleryItem(item);
            newPhoto.setAuthor(author);
            newPhoto.setImageName(fileName);
            item.getPhotos().add(newPhoto);
        }
    }

}
