package org.example.threllia.Modal.Gallery.service;

import org.example.threllia.Modal.Gallery.entities.Photographer;

public interface PhotographerService {
    Photographer getPhotographer(String name);
    Photographer doesPhotographerExist(String name);
    Photographer savePhotographer(Photographer photographer);
}
