package org.example.threllia.Servicies;

import org.example.threllia.Modal.News.LatestUpdate;
import org.example.threllia.requests.LatestUpdateRequest;

import java.util.List;

public interface LatestUpdateService {
    LatestUpdate getLatestUpdateById(Long id) throws Exception;
    List<LatestUpdate> getAllNews();
    LatestUpdate createLatestUpdate(LatestUpdateRequest request, String fileName);

}
