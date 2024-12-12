package com.example.Cars.Service;

import com.example.Cars.Model.Role;
import com.example.Cars.Model.Utilisateur;
import com.example.Cars.Repository.UtilisateurRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UtilisateurService {

    private final UtilisateurRepo utilisateurRepository;

    public Utilisateur postUtilisateur(Utilisateur utilisateur) {
        if (utilisateur.getRole() == null) {
            utilisateur.setRole(Role.CLIENT);
        }

        return utilisateurRepository.save(utilisateur);
    }

    public Utilisateur getUtilisateurByEmail(String email) {

        return utilisateurRepository.findByEmail(email);
    }

    public Utilisateur getUtilisateurById(Long id) {
        Optional<Utilisateur> utilisateur = utilisateurRepository.findById(id);
        return utilisateur.orElse(null);
    }

    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    public Utilisateur updateUtilisateur(Long id, Utilisateur utilisateur) {
        if (utilisateurRepository.existsById(id)) {
            utilisateur.setId(id);
            return utilisateurRepository.save(utilisateur);
        }
        return null;
    }

    public void deleteUtilisateur(Long id) {
        if (utilisateurRepository.existsById(id)) {
            utilisateurRepository.deleteById(id);
        }


    }
}
