package com.example.Cars.Controller;

import com.example.Cars.Model.Voiture;
import com.example.Cars.Service.VoitureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/voitures")
public class VoitureController {

    private final VoitureService voitureService;

    // Create a new Voiture
    @PostMapping("/add")
    public ResponseEntity<Voiture> addVoiture(@RequestBody Voiture voiture) {
        Voiture savedVoiture = voitureService.saveVoiture(voiture);
        return ResponseEntity.ok(savedVoiture);
    }

    public VoitureController(VoitureService voitureService) {
        this.voitureService = voitureService;
    }

    // Get all Voitures
    @GetMapping("/all")
    public List<Voiture> getAllVoitures() {
        return voitureService.getAllVoitures();
    }

    // Get Voiture by ID
    @GetMapping("/{id}")
    public ResponseEntity<Voiture> getVoitureById(@PathVariable Long id) {
        Optional<Voiture> voiture = voitureService.getVoitureById(id);
        return voiture.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> deleteVoiture(@PathVariable Long id) {
        try {
            voitureService.deleteVoiture(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.out.println("Error occurred while deleting voiture: " + e.getMessage());
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting voiture");
    }

}
