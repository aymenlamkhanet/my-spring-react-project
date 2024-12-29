package com.example.Cars.Controller;

import com.example.Cars.Model.Reservation;
import com.example.Cars.Service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    // Create a new reservation
    @PostMapping("/add")
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
        Reservation savedReservation = reservationService.createReservation(reservation);
        return ResponseEntity.ok(savedReservation);
    }

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    // Get all reservations
    @GetMapping("/all")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }


    @GetMapping("/get/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
        Reservation reservation = reservationService.getReservationById(id);
        return ResponseEntity.ok(reservation);
    }

    @GetMapping("/car-schedule/{voitureId}")
    public ResponseEntity<List<Map<String, Object>>> getCarSchedule(@PathVariable Long voitureId) {
        List<Map<String, Object>> schedule = reservationService.getCarAvailabilitySchedule(voitureId);
        return ResponseEntity.ok(schedule);
    }

    @GetMapping("/check-availability/{voitureId}")
    public ResponseEntity<Boolean> checkCarAvailability(
            @PathVariable Long voitureId,
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate) {
        boolean isAvailable = reservationService.isCarAvailableForPeriod(voitureId, startDate, endDate);
        return ResponseEntity.ok(isAvailable);
    }

    @GetMapping("/byUtilisateur/{utilisateurId}")
    public List<Reservation> getReservationsByUtilisateur(@PathVariable Long utilisateurId) {
        return reservationService.getReservationsByUtilisateurId(utilisateurId);
    }

    @GetMapping("/byVoiture/{voitureId}")
    public List<Reservation> getReservationsByVoiture(@PathVariable Long voitureId) {
        return reservationService.getReservationsByVoitureId(voitureId);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable Long id, @RequestBody Reservation reservationDetails) {
        Reservation updatedReservation = reservationService.updateReservation(id, reservationDetails);
        return ResponseEntity.ok(updatedReservation);
    }


    @DeleteMapping("/del/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }
}
