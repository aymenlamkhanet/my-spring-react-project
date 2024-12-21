package com.example.Cars.Controller;

import com.example.Cars.Model.paiement;
import com.example.Cars.Service.paiementService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/paiements")
public class paiementController {

    private final paiementService paiementService;

    public paiementController(com.example.Cars.Service.paiementService paiementService) {
        this.paiementService = paiementService;
    }

    // Create a new payment
    @PostMapping("/add")
    public ResponseEntity<?> createPaiement(@RequestBody paiement paiement) {
        try {
            // Validate input
            if (paiement == null || paiement.getReservation() == null || paiement.getReservation().getId() == null) {
                return ResponseEntity.badRequest().body("Invalid paiement or reservation details.");
            }

            // Call the service layer to create the paiement
            paiement createdPaiement = paiementService.createPaiement(paiement);

            // Return a successful response
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPaiement);

        } catch (EntityNotFoundException e) {
            // Handle the case where the reservation is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (Exception e) {
            // Handle other unexpected exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while creating the paiement.");
        }
    }


    // Get payment by id
    @GetMapping("/{id}")
    public ResponseEntity<paiement> getPaiementById(@PathVariable Long id) {
        paiement paiement = paiementService.getPaiementById(id);
        if (paiement != null) {
            return ResponseEntity.ok(paiement);
        }
        return ResponseEntity.notFound().build();
    }

    // Get all payments
    @GetMapping("/all")
    public ResponseEntity<List<paiement>> getAllPaiements() {
        List<paiement> paiements = paiementService.getAllPaiements();
        return ResponseEntity.ok(paiements);
    }

    // Update a payment
    @PutMapping("/update/{id}")
    public ResponseEntity<paiement> updatePaiement(@PathVariable Long id, @RequestBody paiement paiementDetails) {
        paiement updatedPaiement = paiementService.updatePaiement(paiementDetails, id);
        if (updatedPaiement != null) {
            return ResponseEntity.ok(updatedPaiement);
        }
        return ResponseEntity.notFound().build();
    }

    // Delete a payment
    @DeleteMapping("/del/{id}")
    public ResponseEntity<Void> deletePaiement(@PathVariable Long id) {
        paiementService.deletePaiementById(id);
        return ResponseEntity.noContent().build();
    }
}
