package com.f1hub.backend.service;

import com.f1hub.backend.Model.Piloto;
import com.f1hub.backend.repository.PilotoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PilotoService {

    private final PilotoRepository pilotoRepository;

    public PilotoService(PilotoRepository pilotoRepository) {
        this.pilotoRepository = pilotoRepository;
    }

    public List<Piloto> listarTodos() {
        return pilotoRepository.findAll();
    }

    public Optional<Piloto> buscarPorId(Long id) {
        return pilotoRepository.findById(id);
    }

    public Piloto salvar(Piloto piloto) {
        return pilotoRepository.save(piloto);
    }

    public void excluir(Long id) {
        pilotoRepository.deleteById(id);
    }
}