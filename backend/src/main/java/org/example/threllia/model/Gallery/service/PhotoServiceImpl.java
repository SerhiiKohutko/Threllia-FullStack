package org.example.threllia.model.Gallery.service;

import org.example.threllia.dto.PhotoCollectionDTO;
import org.example.threllia.model.Gallery.entities.Photo;
import org.example.threllia.model.Gallery.entities.PhotoCollection;
import org.example.threllia.model.Gallery.entities.Photographer;
import org.example.threllia.model.Gallery.repository.PhotoRepository;
import org.example.threllia.model.Release.enums.SortingType;
import org.example.threllia.requests.PhotoCollectionCreationRequest;
import org.example.threllia.utils.FileUploaderCloud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;


@Service
public class PhotoServiceImpl implements PhotoService {

    @Autowired
    private PhotoRepository photoRepository;
    @Autowired
    private PhotographerService photographerService;
    @Autowired
    private FileUploaderCloud fileUploaderCloud;

    @Override
    public Page<PhotoCollectionDTO> getAllPhotosPaginated(int page, SortingType order) {
        PageRequest pageRequest = PageRequest.of(page, 6,
                order.equals(SortingType.DSC)
                ? Sort.by("date").descending()
                : Sort.by("date").ascending());
        return mapEveryToPhotoCollectionDTO(photoRepository.getAllGalleryItems(pageRequest));
    }

    private Page<PhotoCollectionDTO> mapEveryToPhotoCollectionDTO(Page<PhotoCollection> photoCollections){
        return photoCollections.map(this::mapToPhotoCollectionDTO);
    }

    private PhotoCollectionDTO mapToPhotoCollectionDTO(PhotoCollection photoCollection){
        PhotoCollectionDTO photoCollectionDTO = new PhotoCollectionDTO();
        photoCollectionDTO.setId(photoCollection.getId());
        photoCollectionDTO.setTitle(photoCollection.getTitle());
        photoCollectionDTO.setDate(photoCollection.getDate());
        photoCollectionDTO.setFirstElementPhotoName(photoCollection.getPhotos().get(0).getImageName());
        return photoCollectionDTO;
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
    public PhotoCollection updatePhotoCollection(long id, PhotoCollectionCreationRequest request, List<String> fileNames) throws Exception {
        PhotoCollection updatedPhotoCollection = getById(id);

        Photographer author = photographerService.getPhotographer(request.getAuthor().trim());

        updatePhotoCollectionAuthorAndFilter(author, updatedPhotoCollection, request.getPhotos());

        if (fileNames != null) addAllPhotosToGalleryItem(fileNames, author, updatedPhotoCollection);

        updatedPhotoCollection.setTitle(request.getTitle());
        updatedPhotoCollection.setDate(request.getDate());

        return photoRepository.save(updatedPhotoCollection);
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
    private void updatePhotoCollectionAuthorAndFilter(Photographer author, PhotoCollection collection, Set<Long> photoId){

        List<Photo> filteredPhotos = collection.getPhotos()
                .stream()
                .filter(e -> photoId.contains(e.getId()))
                .toList();

        collection.getPhotos().clear();
        collection.getPhotos().addAll(filteredPhotos);

        for (Photo photo : collection.getPhotos()) {
            photo.setAuthor(author);
        }
    }

    @Override
    public void deletePhotoCollectionById(long id) throws Exception {
        fileUploaderCloud.deleteFiles(getById(id).getPhotos());
        photoRepository.deleteById(id);
    }

}
