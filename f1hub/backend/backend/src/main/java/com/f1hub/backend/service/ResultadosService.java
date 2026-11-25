
package com.f1hub.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.core.ParameterizedTypeReference;

import java.util.Map;

@Service
public class ResultadosService {

    private final RestClient api;

    public ResultadosService() {
        this.api = RestClient.builder()
                .baseUrl("https://api.jolpi.ca/ergast/f1")
                .build();
    }

    // Busca todas as corridas da temporada
    public Map<String, Object> buscarCalendario(int ano) {
        return api.get()
            .uri("/{ano}/races.json?limit=100", ano)
            .retrieve()
            .body(new ParameterizedTypeReference<
                Map<String, Object>>() {});
    }

    // Busca a última corrida e seus resultados
    public Map<String, Object> buscarUltimaCorrida(int ano) {
        return api.get()
            .uri("/{ano}/last/results.json?limit=100", ano)
            .retrieve()
            .body(new ParameterizedTypeReference<
                Map<String, Object>>() {});
    }

    // Busca a próxima corrida
    public Map<String, Object> buscarProximaCorrida(int ano) {
        return api.get()
            .uri("/{ano}/next/races.json", ano)
            .retrieve()
            .body(new ParameterizedTypeReference<
                Map<String, Object>>() {});
    }

    // Busca o resultado de uma etapa específica
    public Map<String, Object> buscarResultado(
        int ano, int etapa) {

        return api.get()
            .uri("/{ano}/{etapa}/results.json?limit=100",
                ano, etapa)
            .retrieve()
            .body(new ParameterizedTypeReference<
                Map<String, Object>>() {});
    }
}
