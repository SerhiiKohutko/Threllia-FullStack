package org.example.threllia.model.Gallery.service;

import org.example.threllia.model.Gallery.entities.Photographer;

public interface PhotographerService {
    Photographer getPhotographer(String name);
    Photographer doesPhotographerExist(String name);
    Photographer savePhotographer(Photographer photographer);
}
