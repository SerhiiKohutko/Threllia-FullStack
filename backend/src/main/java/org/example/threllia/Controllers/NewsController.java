package org.example.threllia.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.threllia.model.News.entities.LatestUpdate;
import org.example.threllia.model.News.service.LatestUpdateService;
import org.example.threllia.requests.LatestUpdateRequest;
import org.example.threllia.utils.FileUploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    @Autowired
    private LatestUpdateService latestUpdateService;
    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<List<LatestUpdate>> getAllNews(){
        return new ResponseEntity<>(latestUpdateService.getAllNews(), HttpStatus.OK);
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<LatestUpdate>> getAllNewsPaginated(@RequestParam(defaultValue = "0") int page){
        Page<LatestUpdate> news = latestUpdateService.getAllNews(page);
        return ResponseEntity.ok(news);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LatestUpdate> getLatestUpdateById(@PathVariable Long id) throws Exception {
        return new ResponseEntity<>(latestUpdateService.getLatestUpdateById(id), HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<LatestUpdate> createLatestUpdate(@RequestParam("content") String data, @RequestParam("image") MultipartFile image) throws Exception {
        String fileName = FileUploader.uploadLatestUpdateImage(image);
        LatestUpdateRequest request = objectMapper.readValue(data, LatestUpdateRequest.class);

        LatestUpdate newLatestUpdate = latestUpdateService.createLatestUpdate(request, fileName);
        return new ResponseEntity<>(newLatestUpdate, HttpStatus.CREATED);
    }

}
