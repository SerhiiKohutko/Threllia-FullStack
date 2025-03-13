package org.example.threllia.Controllers;

import org.example.threllia.Modal.News.LatestUpdate;
import org.example.threllia.Servicies.LatestUpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    @Autowired
    private LatestUpdateService latestUpdateService;

    @GetMapping
    public ResponseEntity<List<LatestUpdate>> getAllNews(){
        return new ResponseEntity<>(latestUpdateService.getAllNews(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LatestUpdate> getLatestUpdateById(@PathVariable Long id) throws Exception {
        return new ResponseEntity<>(latestUpdateService.getLatestUpdateById(id), HttpStatus.OK);
    }
}
