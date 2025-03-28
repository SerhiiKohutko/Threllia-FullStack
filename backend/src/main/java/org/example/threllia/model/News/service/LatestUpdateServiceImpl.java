package org.example.threllia.model.News.service;

import org.example.threllia.model.News.entities.LatestUpdate;
import org.example.threllia.model.News.repository.LatestUpdateRepository;
import org.example.threllia.requests.LatestUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LatestUpdateServiceImpl implements LatestUpdateService {
    @Autowired
    private LatestUpdateRepository latestUpdateRepository;

    @Override
    public LatestUpdate getLatestUpdateById(Long id) throws Exception {
        return latestUpdateRepository.findLatestUpdateById(id).orElseThrow(() -> new Exception("Latest update not found with this id = " + id));
    }

    @Override
    public List<LatestUpdate> getAllNews() {
        return latestUpdateRepository.findAll();
    }

    @Override
    public Page<LatestUpdate> getAllNews(int page, boolean isOverview) {
        PageRequest pageRequest = PageRequest.of(page, isOverview ? 4 : 2, Sort.by("dateCreated").descending());
        return latestUpdateRepository.findAll(pageRequest);
    }

    @Override
    public LatestUpdate createLatestUpdate(LatestUpdateRequest request, String fileName) {
        LatestUpdate latestUpdate = LatestUpdate.builder().content(request.getContent()).imageName(fileName).title(request.getTitle()).build();
        return latestUpdateRepository.save(latestUpdate);
    }
}
