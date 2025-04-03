package org.example.threllia.model.Release.service;

import org.example.threllia.model.Release.entities.MusicRelease;
import org.example.threllia.model.Release.enums.SortingType;
import org.example.threllia.requests.ReleaseRequest;
import org.springframework.data.domain.Page;

public interface ReleaseService {

    Page<MusicRelease> getAllReleases(int page, SortingType type);

    MusicRelease getReleaseById(long id) throws Exception;

    MusicRelease addRelease(ReleaseRequest release, String releaseCoverName) throws Exception;

    MusicRelease updateMusicRelease(long id, ReleaseRequest request, String fileName) throws Exception;

    void deleteReleaseById(long id);
}
