package com.example.Cars.Model;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;



@Data
@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "dateReservation")
    private LocalDateTime dateReservation;

    @Column(name = "dateFin")
    private LocalDateTime dateFin;

    @Column(name = "montantTotal")
    private double montantTotal;

    @Column(name = "retourVoiture")
    private boolean retourVoiture;

    @ManyToOne
    @JoinColumn(name = "voiture_id", nullable = false)
    private Voiture voiture;

    @ManyToOne
    @JoinColumn(name = "utilisateur_id", nullable = false)
    private Utilisateur utilisateur;


}

