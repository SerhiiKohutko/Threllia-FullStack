package org.example.threllia.model.Gallery.service;

import org.example.threllia.model.Gallery.entities.Photographer;
import org.example.threllia.model.Gallery.repository.PhotographerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PhotographerServiceImpl implements PhotographerService{

    @Autowired
    private PhotographerRepository photographerRepository;


    @Override
    public Photographer getPhotographer(String name) {
        Optional<Photographer> photographerOptional = photographerRepository.findPhotographerByName(name);

        if (photographerOptional.isEmpty()){
            Photographer newPhotographer = new Photographer();
            newPhotographer.setName(name);
            return savePhotographer(newPhotographer);
        }

        return photographerOptional.get();
    }

    @Override
    public Photographer savePhotographer(Photographer photographer) {
        return photographerRepository.save(photographer);
    }
}
