package com.example.Cars.Model;
import jakarta.persistence.*;
import lombok.Data;


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

    public Long getId() {
        return id;
    }

    public String getMarque() {
        return marque;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public String getModele() {
        return modele;
    }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public String getAnnee() {
        return annee;
    }

    public void setAnnee(String annee) {
        this.annee = annee;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public double getTarifLocation() {
        return tarifLocation;
    }

    public void setTarifLocation(double tarifLocation) {
        this.tarifLocation = tarifLocation;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public double getKilometrage() {
        return kilometrage;
    }

    public void setKilometrage(double kilometrage) {
        this.kilometrage = kilometrage;
    }

    public String getCouleur() {
        return couleur;
    }

    public void setCouleur(String couleur) {
        this.couleur = couleur;
    }

    public String getImmatriculation() {
        return immatriculation;
    }

    public void setImmatriculation(String immatriculation) {
        this.immatriculation = immatriculation;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "type")
    private String type;

    @Column(name = "image")
    private String image;

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

