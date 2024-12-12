package com.example.Cars.Repository;

import com.example.Cars.Model.Voiture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoitureRepo  extends JpaRepository<Voiture, Long> {
}
