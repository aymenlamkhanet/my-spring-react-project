package com.example.Cars.Controller;

import com.example.Cars.Model.Utilisateur;
import com.example.Cars.Service.UtilisateurService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


import java.util.List;


@RestController
@RequestMapping("/utilisateur")
@CrossOrigin(origins = "http://localhost:3000")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;

    public UtilisateurController(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    // Create a new Utilisateur
    @PostMapping("/add")
    public Utilisateur postUtilisateur(@RequestBody Utilisateur utilisateur) {
        return utilisateurService.postUtilisateur(utilisateur);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Utilisateur utilisateur) {
        try {
            // Check if the user exists and validate the password
            Utilisateur foundUser = utilisateurService.getUtilisateurByEmail(utilisateur.getEmail());

            if (foundUser == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
            }

            // Basic password comparison (recommend using BCrypt in production)
            if (foundUser.getPassword().equals(utilisateur.getPassword())) {
                // You might want to return more user info or a token here
                return ResponseEntity.ok(foundUser);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
            }
        } catch (Exception e) {
            // Log the full exception for server-side debugging
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login failed: " + e.getMessage());
        }
    }



    @GetMapping("get/{id}")
    public Utilisateur getUtilisateur(@PathVariable Long id) {


        return utilisateurService.getUtilisateurById(id);
    }





    @PutMapping("/{id}")
    public Utilisateur updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur utilisateur) {
        return utilisateurService.updateUtilisateur(id, utilisateur);
    }

    @GetMapping("/clients")
    public List<Utilisateur> getAllUtilisateur() {
        return utilisateurService.getAllUtilisateurs();
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> deleteUtilisateur(@PathVariable Long id) {
        try {
            utilisateurService.deleteUtilisateur(id);
            return ResponseEntity.ok().build();
        }catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
