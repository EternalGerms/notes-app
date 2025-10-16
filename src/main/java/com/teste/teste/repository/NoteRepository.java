package com.teste.teste.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teste.teste.entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {
    
}
