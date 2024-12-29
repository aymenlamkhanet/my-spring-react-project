package com.example.Cars.Service;

import com.example.Cars.Model.Reservation;
import com.example.Cars.Model.Utilisateur;
import com.example.Cars.Model.Voiture;
import com.example.Cars.Repository.ReservationRepo;
import com.example.Cars.Repository.UtilisateurRepo;
import com.example.Cars.Repository.VoitureRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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


    public List<Map<String, Object>> getCarAvailabilitySchedule(Long voitureId) {
        // Get the car first
        Voiture voiture = voitureRepo.findById(voitureId)
                .orElseThrow(() -> new RuntimeException("Car not found with ID: " + voitureId));

        // Get all reservations for this car
        List<Reservation> carReservations = reservationRepo.findByVoitureIdOrderByDateReservationAsc(voitureId);

        List<Map<String, Object>> availabilityList = new ArrayList<>();

        for (Reservation reservation : carReservations) {
            Map<String, Object> reservationInfo = new HashMap<>();
            reservationInfo.put("reservationId", reservation.getId());
            reservationInfo.put("startDate", reservation.getDateReservation());
            reservationInfo.put("endDate", reservation.getDateFin());
            reservationInfo.put("isReturned", reservation.isRetourVoiture());
            reservationInfo.put("customerName", reservation.getUtilisateur().getNom() + " " +
                    reservation.getUtilisateur().getPrenom());

            availabilityList.add(reservationInfo);
        }

        return availabilityList;
    }

    public boolean isCarAvailableForPeriod(Long voitureId, LocalDateTime startDate, LocalDateTime endDate) {
        List<Reservation> carReservations = reservationRepo.findByVoitureIdOrderByDateReservationAsc(voitureId);

        for (Reservation reservation : carReservations) {
            // Check if there's any overlap with existing reservations
            if (!(endDate.isBefore(reservation.getDateReservation()) ||
                    startDate.isAfter(reservation.getDateFin()))) {
                return false; // There is an overlap
            }
        }

        return true; // No overlaps found
    }


    public List<Reservation> getAllReservations() {
        return reservationRepo.findAll();
    }

    public Reservation getReservationById(Long id) {
        return reservationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found with ID: " + id));
    }

    @Scheduled(fixedRate = 60000) // Runs every minute
    public void checkAndUpdateReservationStatus() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        List<Reservation> reservations = reservationRepo.findAll(); // Get all reservations

        for (Reservation reservation : reservations) {
            Voiture voiture = reservation.getVoiture();

            if (currentDateTime.isAfter(reservation.getDateFin())) {
                // Case 1: Current date is after end date
                reservation.setRetourVoiture(true);
                voiture.setStatut("Disponible");
            } else {
                // Case 2: Current date is before or equal to end date
                reservation.setRetourVoiture(false);
                voiture.setStatut("indisponible");
            }

            // Save both reservation and car updates
            reservationRepo.save(reservation);
            voitureRepo.save(voiture);

            // Logging
            System.out.println("Updated reservation ID " + reservation.getId() +
                    " status to " + (reservation.isRetourVoiture() ? "returned" : "not returned") +
                    " and car status to " + voiture.getStatut());
        }
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
