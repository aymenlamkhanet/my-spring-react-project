package com.example.Cars.Model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Voiture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "marque")
    private String marque;

    @Column(name = "modele")
    private String modele;

    @Column(name = "annee")
    private String annee;

    @Column(name = "type")
    private String type;

    @Column(name = "tarifLocation")
    private double tarifLocation;

    @Column(name = "statut")
    private String statut;

    @Column(name = "kilometrage")
    private double kilometrage;

    @Column(name = "couleur")
    private String couleur;

    @Column(name = "immatriculation")
    private String immatriculation;


}

