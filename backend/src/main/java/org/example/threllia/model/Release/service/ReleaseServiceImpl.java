package org.example.threllia.model.Release.service;

import org.example.threllia.model.Release.entities.MusicRelease;
import org.example.threllia.model.Release.enums.SortingType;
import org.example.threllia.model.Release.repository.ReleaseRepository;
import org.example.threllia.model.Song.entities.Song;
import org.example.threllia.model.Song.service.SongService;
import org.example.threllia.requests.ReleaseRequest;
import org.example.threllia.utils.FileUploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.nio.file.NoSuchFileException;
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
    public Page<MusicRelease> getAllReleases(int page, SortingType type){
        PageRequest pageRequest = PageRequest.of(page, 8,
                type.equals(SortingType.DSC)
                ? Sort.by("date_released").descending()
                : Sort.by("date_released").ascending());
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

    @Override
    public MusicRelease updateMusicRelease(long id, ReleaseRequest request, String fileName) throws Exception {
        MusicRelease musicRelease = getReleaseById(id);

        //Deleting previous image

        musicRelease.setDateReleased(request.getDateReleased());
        musicRelease.setTitle(request.getTitle());
        musicRelease.setDescription(request.getDescription());
        musicRelease.setTrackList(getTrackList(request.getSongList()));
        musicRelease.setNameToInstrumentsPlayed(request.getNameToInstrumentsPlayed());

        if (fileName != null){
            System.out.println(fileName);

            try {
                FileUploader.deleteReplacedCover(musicRelease.getCoverName());
            } catch (NoSuchFileException ignored){}

            musicRelease.setCoverName(fileName);
        }

        return releaseRepository.save(musicRelease);
    }

    @Override
    public void deleteReleaseById(long id) {
        releaseRepository.deleteById(id);
    }
}
