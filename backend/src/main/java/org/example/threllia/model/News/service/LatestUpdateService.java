package org.example.threllia.model.News.service;

import org.example.threllia.model.News.entities.LatestUpdate;
import org.example.threllia.requests.LatestUpdateRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface LatestUpdateService {
    LatestUpdate getLatestUpdateById(Long id) throws Exception;
    List<LatestUpdate> getAllNews();
    Page<LatestUpdate> getAllNews(int page, boolean isOverview);
    LatestUpdate createLatestUpdate(LatestUpdateRequest request, String fileName);

}
