package edu.ifba.notificacoes_ms.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.ifba.notificacoes_ms.models.Email;

@Repository
public interface EmailRepository extends JpaRepository<Email, Long>{

}
