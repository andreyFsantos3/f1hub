
package com.f1hub.backend.controller;

import com.f1hub.backend.service.ResultadosService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/f1")
@CrossOrigin(origins = "http://localhost:5173")
public class ResultadosController {

    private final ResultadosService service;

    public ResultadosController(ResultadosService service) {
        this.service = service;
    }

    @GetMapping("/calendario/{ano}")
    public Map<String, Object> calendario(
        @PathVariable int ano) {

        return service.buscarCalendario(ano);
    }

    @GetMapping("/ultima-corrida/{ano}")
    public Map<String, Object> ultimaCorrida(
        @PathVariable int ano) {

        return service.buscarUltimaCorrida(ano);
    }

    @GetMapping("/proxima-corrida/{ano}")
    public Map<String, Object> proximaCorrida(
        @PathVariable int ano) {

        return service.buscarProximaCorrida(ano);
    }

    @GetMapping("/resultados/{ano}/{etapa}")
    public Map<String, Object> resultados(
        @PathVariable int ano,
        @PathVariable int etapa) {

        return service.buscarResultado(ano, etapa);
    }
}
