package com.example.Cars.Model;
import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
public class paiement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private Long id;

    private double amount;
    private String paymentMethod;

    @ManyToOne
    @JoinColumn(name = "reservation_id", nullable = false)
    private Reservation reservation;


}

