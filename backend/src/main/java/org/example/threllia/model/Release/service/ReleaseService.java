package org.example.threllia.model.Release.service;

import org.example.threllia.model.Release.entities.MusicRelease;
import org.example.threllia.model.Song.entities.Song;
import org.example.threllia.requests.ReleaseRequest;

import java.util.List;
import java.util.Set;

public interface ReleaseService {

    List<MusicRelease> getAllReleases();

    MusicRelease getReleaseById(long id) throws Exception;

    MusicRelease addRelease(ReleaseRequest release, String releaseCoverName) throws Exception;
    MusicRelease updateReleaseTrackList(Set<Song> songs, long releaseId);
}
