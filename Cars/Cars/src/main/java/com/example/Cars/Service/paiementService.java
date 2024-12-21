package com.example.Cars.Service;


import com.example.Cars.Model.Reservation;
import com.example.Cars.Repository.ReservationRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.Cars.Repository.paiementRepo;
import com.example.Cars.Model.paiement;

import java.util.List;

@Service
public class paiementService {
    private  final paiementRepo paiementRepo ;
    private final ReservationRepo reservationRepo;

    public paiementService(com.example.Cars.Repository.paiementRepo paiementRepo, ReservationRepo reservationRepo) {
        this.paiementRepo = paiementRepo;
        this.reservationRepo = reservationRepo;
    }

    public paiement createPaiement(paiement paiement) {
        if (paiement == null || paiement.getReservation() == null || paiement.getReservation().getId() == null) {
            throw new IllegalArgumentException("Paiement or associated reservation details are invalid.");
        }

        Reservation reservation = reservationRepo.findById(paiement.getReservation().getId()).orElseThrow(
                () -> new EntityNotFoundException("Reservation with the specified ID not found.")
        );

        paiement.setId(null); // Ensure the ID is null for creating a new entity
        paiement.setReservation(reservation);
        return paiementRepo.save(paiement);
    }


    public paiement getPaiementById(Long id) {
        return paiementRepo.findById(id).orElse(null);
    }

    public List<paiement> getAllPaiements() {
        return paiementRepo.findAll();
    }

    public void deletePaiementById(Long id) {
        paiementRepo.deleteById(id);
    }

    public  paiement updatePaiement(paiement paiement , Long id) {
        paiement paiement1 = getPaiementById(id);
        if(paiement1 != null) {
            paiement.setAmount(paiement1.getAmount());
            paiement.setPaymentMethod(paiement1.getPaymentMethod());
            paiement.setReservation(paiement1.getReservation());
            return  paiementRepo.save(paiement);
        }
        return null;
    }
}
