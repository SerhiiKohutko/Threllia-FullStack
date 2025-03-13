package org.example.threllia.Servicies;

import org.example.threllia.Modal.News.LatestUpdate;

import java.util.List;

public interface LatestUpdateService {
    LatestUpdate getLatestUpdateById(Long id) throws Exception;
    List<LatestUpdate> getAllNews();

}
