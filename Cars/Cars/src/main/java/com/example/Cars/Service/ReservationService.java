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
public class ReservationService {

    private final ReservationRepo reservationRepo;
    private final VoitureRepo voitureRepo;
    private final UtilisateurRepo utilisateurRepo;

    public ReservationService(ReservationRepo reservationRepo, VoitureRepo voitureRepo, UtilisateurRepo utilisateurRepo) {
        this.reservationRepo = reservationRepo;
        this.voitureRepo = voitureRepo;
        this.utilisateurRepo = utilisateurRepo;
    }

    public Reservation createReservation(Reservation reservation) {
        Voiture voiture = voitureRepo.findById(reservation.getVoiture().getId()).orElse(null);
        Utilisateur utilisateur = utilisateurRepo.findById(reservation.getUtilisateur().getId()).orElse(null);
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


    public List<Reservation> getReservationsByUtilisateurId(Long utilisateurId) {
        return reservationRepo.findByUtilisateurId(utilisateurId);
    }

    public List<Reservation> getReservationsByVoitureId(Long voitureId) {
        return reservationRepo.findByVoitureId(voitureId);
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
