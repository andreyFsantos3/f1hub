package com.f1hub.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;


@SpringBootApplication
@EnableScheduling
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Scheduled(fixedDelay = 30 * 60 * 1000)
    public void atualizarResultados() {
        
        System.out.println("Verificando atualização dos resultados da F1...");
    }
}
