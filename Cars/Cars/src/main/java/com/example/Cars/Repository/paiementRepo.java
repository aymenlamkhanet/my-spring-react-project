package com.example.Cars.Repository;

import com.example.Cars.Model.paiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface paiementRepo extends JpaRepository<paiement, Long> {
}
