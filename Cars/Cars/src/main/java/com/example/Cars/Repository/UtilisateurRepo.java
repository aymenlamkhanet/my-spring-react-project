package com.example.Cars.Repository;
import com.example.Cars.Model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UtilisateurRepo extends JpaRepository<Utilisateur, Long> {

    Utilisateur findByEmail(String email);

}
