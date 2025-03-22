package org.example.threllia.model.Gallery.service;

import org.example.threllia.model.Gallery.entities.PhotoCollection;
import org.example.threllia.model.Gallery.entities.Photo;
import org.example.threllia.model.Gallery.entities.Photographer;
import org.example.threllia.model.Gallery.repository.PhotoRepository;
import org.example.threllia.model.Release.enums.SortingType;
import org.example.threllia.requests.PhotoCollectionCreationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PhotoServiceImpl implements PhotoService {

    @Autowired
    private PhotoRepository photoRepository;
    @Autowired
    private PhotographerService photographerService;

    @Override
    public Page<PhotoCollection> getAllPhotosPaginated(int page, SortingType order) {
        PageRequest pageRequest = PageRequest.of(page, 6,
                order.equals(SortingType.DSC)
                ? Sort.by("date").descending()
                : Sort.by("date").ascending());
        return photoRepository.getAllGalleryItems(pageRequest);
    }

    @Override
    public List<PhotoCollection> getPhotos() {
        return photoRepository.findAll();
    }

    @Override
    public PhotoCollection getById(long id) throws Exception {
        return photoRepository.findGalleryItemById(id).orElseThrow(() -> new Exception("GalleryItem not found with id = " + id));
    }


    @Override
    public PhotoCollection createGalleryItem(PhotoCollectionCreationRequest request, List<String> fileNames) {
        Photographer author = photographerService.getPhotographer(request.getAuthor().trim());

        PhotoCollection newPhotoCollection = new PhotoCollection();
        newPhotoCollection.setTitle(request.getTitle());
        newPhotoCollection.setDate(request.getDate());

        addAllPhotosToGalleryItem(fileNames, author, newPhotoCollection);

        return photoRepository.save(newPhotoCollection);
    }

    @Override
    public PhotoCollection addPhotos(List<String> fileNames, String author, long id) throws Exception {
        PhotoCollection item = getById(id);
        Photographer photographer = photographerService.getPhotographer(author.trim());
        addAllPhotosToGalleryItem(fileNames, photographer, item);
        return photoRepository.save(item);
    }

    private void addAllPhotosToGalleryItem(List<String> fileNames, Photographer author, PhotoCollection item){
        for (String fileName : fileNames) {
            Photo newPhoto = new Photo();
            newPhoto.setPhotoCollection(item);
            newPhoto.setAuthor(author);
            newPhoto.setImageName(fileName);
            item.getPhotos().add(newPhoto);
        }
    }

}
