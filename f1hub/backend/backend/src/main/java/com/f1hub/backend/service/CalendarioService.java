package com.f1hub.backend.service;


import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class CalendarioService {

    private final RestClient restClient;

    public CalendarioService() {
        this.restClient = RestClient.builder()
                .baseUrl("https://api.openf1.org/v1")
                .build();
    }

    public List<Map<String, Object>> buscarCalendario(int ano) {

        List<Map<String, Object>> resposta = restClient.get()
                .uri("/meetings?year={ano}", ano)
                .retrieve()
                .body(new org.springframework.core.ParameterizedTypeReference<
                        List<Map<String, Object>>>() {});

        return resposta == null ? List.of() : resposta;
    }
}
