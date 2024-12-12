package com.example.Cars.Service;

import com.example.Cars.Model.Voiture;
import com.example.Cars.Repository.VoitureRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VoitureService {

    private final VoitureRepo voitureRepo;

    // Create or update Voiture
    public Voiture saveVoiture(Voiture voiture) {
        return voitureRepo.save(voiture);
    }

    // Get Voiture by ID
    public Optional<Voiture> getVoitureById(Long id) {
        return voitureRepo.findById(id);
    }

    // Get all Voitures
    public List<Voiture> getAllVoitures() {
        return voitureRepo.findAll();
    }

    // Delete Voiture by ID
    public void deleteVoiture(Long id) {
        voitureRepo.deleteById(id);
    }
}
