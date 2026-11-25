package com.f1hub.backend.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "pilotos")
public class Piloto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    private Integer numero;

    private String nacionalidade;

    private String equipe;

    public Piloto() {
    }

    public Piloto(String nome, Integer numero, String nacionalidade, String equipe) {
        this.nome = nome;
        this.numero = numero;
        this.nacionalidade = nacionalidade;
        this.equipe = equipe;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getNacionalidade() {
        return nacionalidade;
    }

    public void setNacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
    }

    public String getEquipe() {
        return equipe;
    }

    public void setEquipe(String equipe) {
        this.equipe = equipe;
    }
}
    

