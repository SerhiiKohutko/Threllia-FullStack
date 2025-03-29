package org.example.threllia.model.Release.service;

import org.example.threllia.model.Release.entities.MusicRelease;
import org.example.threllia.model.Release.enums.SortingType;
import org.example.threllia.model.Song.entities.Song;
import org.example.threllia.requests.ReleaseRequest;
import org.springframework.data.domain.Page;

import java.util.Set;

public interface ReleaseService {

    Page<MusicRelease> getAllReleases(int page, SortingType type);

    MusicRelease getReleaseById(long id) throws Exception;

    MusicRelease addRelease(ReleaseRequest release, String releaseCoverName) throws Exception;
    MusicRelease updateReleaseTrackList(Set<Song> songs, long releaseId);

    MusicRelease updateMusicRelease(long id, ReleaseRequest request, String fileName) throws Exception;

    void deleteReleaseById(long id);
}
