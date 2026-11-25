package com.f1hub.backend.controller;

import com.f1hub.backend.Model.Piloto;
import com.f1hub.backend.service.PilotoService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/pilotos")
@CrossOrigin(origins = "http://localhost:5173")
public class PilotoController {

    private final PilotoService pilotoService;

    public PilotoController(PilotoService pilotoService) {
        this.pilotoService = pilotoService;
    }

    @GetMapping
    public List<Piloto> listarTodos() {
        return pilotoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Piloto> buscarPorId(@PathVariable Long id) {
        return pilotoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Piloto cadastrar(@RequestBody Piloto piloto) {
        return pilotoService.salvar(piloto);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        pilotoService.excluir(id);
    }
}