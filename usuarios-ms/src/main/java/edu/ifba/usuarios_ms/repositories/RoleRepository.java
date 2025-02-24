package edu.ifba.usuarios_ms.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.ifba.usuarios_ms.models.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
  
}
