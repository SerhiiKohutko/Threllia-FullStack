package org.example.threllia.Servicies;

import org.example.threllia.Modal.Gallery.GalleryItem;
import org.example.threllia.Repositories.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoServiceImpl implements PhotoService{

    @Autowired
    private PhotoRepository photoRepository;

    @Override
    public List<GalleryItem> getPhotos() {
        return photoRepository.findAll();
    }

    @Override
    public GalleryItem getById(long id) throws Exception {
        return photoRepository.findGalleryItemById(id).orElseThrow(() -> new Exception("GalleryItem not found with id = " + id));
    }
}
