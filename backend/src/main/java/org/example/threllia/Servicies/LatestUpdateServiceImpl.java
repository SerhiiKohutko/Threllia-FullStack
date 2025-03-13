package org.example.threllia.Servicies;

import org.example.threllia.Modal.News.LatestUpdate;
import org.example.threllia.Repositories.LatestUpdateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LatestUpdateServiceImpl implements LatestUpdateService{
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
}
