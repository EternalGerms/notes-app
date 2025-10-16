package com.teste.teste.controller;

import org.springframework.web.bind.annotation.RestController;

import com.teste.teste.entity.Note;
import com.teste.teste.repository.NoteRepository;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class NoteController {

    private final NoteRepository noteRepository;

    public NoteController(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @GetMapping("/api/notes")
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    @PostMapping("/api/notes")
    public Note createNewNote(@RequestBody Note note) {
        return noteRepository.save(note);
    }

}
