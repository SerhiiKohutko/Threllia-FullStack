package org.example.threllia.model.Release.service;

import org.example.threllia.model.Release.entities.MusicRelease;
import org.example.threllia.model.Release.repository.ReleaseRepository;
import org.example.threllia.model.Song.entities.Song;
import org.example.threllia.model.Song.service.SongService;
import org.example.threllia.requests.ReleaseRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class ReleaseServiceImpl implements ReleaseService{

    @Autowired
    private ReleaseRepository releaseRepository;

    @Autowired
    private SongService songService;

    @Override
    public Page<MusicRelease> getAllReleases(int page){
        PageRequest pageRequest = PageRequest.of(page, 8);
        return releaseRepository.getAllReleases(pageRequest);
    }

    @Override
    public MusicRelease getReleaseById(long id) throws Exception {
        return releaseRepository.getReleasesById(id).orElseThrow(() -> new Exception("No release found with such id = " + id));
    }

    @Override
    public MusicRelease addRelease(ReleaseRequest release, String releaseCoverName) throws Exception {

        MusicRelease newMusicRelease = MusicRelease.builder()
                .trackList(getTrackList(release.getSongList()))
                .dateReleased(release.getDateReleased())
                .title(release.getTitle())
                .coverName(releaseCoverName)
                .description(release.getDescription())
                .nameToInstrumentsPlayed(release.getNameToInstrumentsPlayed())
                .build();

        return releaseRepository.save(newMusicRelease);
    }

    private List<Song> getTrackList(Set<String> requestList) throws Exception {
        List<Song> trackList = new ArrayList<>();

        for (String s : requestList){
            trackList.add(songService.getSongByTitle(s));
        }
        return trackList;
    }


    //prod functionality
    @Override
    public MusicRelease updateReleaseTrackList(Set<Song> songs, long releaseId) {

        return null;
    }
}
