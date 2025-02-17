package edu.ifba.salas_ms.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import edu.ifba.salas_ms.models.Sala;

@Repository
public interface SalaRepository extends JpaRepository<Sala,Long>{

	
}
