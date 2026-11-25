
package com.f1hub.backend.controller;

import com.f1hub.backend.service.CalendarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/calendario")
@CrossOrigin(origins = "http://localhost:5173")
public class CalendarioController {

    private final CalendarioService calendarioService;

    public CalendarioController(CalendarioService calendarioService) {
        this.calendarioService = calendarioService;
    }

    @GetMapping
    public List<Map<String, Object>> listarCalendario(
            @RequestParam(defaultValue = "2026") int ano) {

        return calendarioService.buscarCalendario(ano);
    }
}
