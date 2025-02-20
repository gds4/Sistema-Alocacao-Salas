package edu.ifba.usuarios_ms.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import edu.ifba.usuarios_ms.models.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long >{
    UserDetails findByEmail(String email);

    @Query(nativeQuery = true, value = "Select * from usuarios where email = ?1")
    public Optional<Usuario> buscarUsuarioPorEmail(String email);

}
