package com.example.Cars.Service;

import com.example.Cars.Model.Reservation;
import com.example.Cars.Model.Utilisateur;
import com.example.Cars.Model.Voiture;
import com.example.Cars.Repository.ReservationRepo;
import com.example.Cars.Repository.UtilisateurRepo;
import com.example.Cars.Repository.VoitureRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepo reservationRepo;
    private final VoitureRepo voitureRepo;
    private final UtilisateurRepo utilisateurRepo;


    public Reservation createReservation(Reservation reservation) {
        Voiture voiture = voitureRepo.findById(reservation.getVoiture().getId()).orElse(null);
        Utilisateur utilisateur = utilisateurRepo.findById(reservation.getVoiture().getId()).orElse(null);
        reservation.setId(null);
        reservation.setVoiture(voiture);
        reservation.setUtilisateur(utilisateur);
        return reservationRepo.save(reservation);
    }


    public List<Reservation> getAllReservations() {
        return reservationRepo.findAll();
    }

    public Reservation getReservationById(Long id) {
        return reservationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found with ID: " + id));
    }

    public Reservation updateReservation(Long id, Reservation reservationDetails) {
        return reservationRepo.findById(id).map(reservation -> {
            reservation.setDateReservation(reservationDetails.getDateReservation());
            reservation.setDateFin(reservationDetails.getDateFin());
            reservation.setMontantTotal(reservationDetails.getMontantTotal());
            reservation.setRetourVoiture(reservationDetails.isRetourVoiture());
            reservation.setVoiture(reservationDetails.getVoiture());
            reservation.setUtilisateur(reservationDetails.getUtilisateur());
            return reservationRepo.save(reservation);
        }).orElseThrow(() -> new RuntimeException("Reservation not found with ID: " + id));
    }

    public void deleteReservation(Long id) {
        if (!reservationRepo.existsById(id)) {
            throw new RuntimeException("Reservation not found with ID: " + id);
        }
        reservationRepo.deleteById(id);
    }
}
