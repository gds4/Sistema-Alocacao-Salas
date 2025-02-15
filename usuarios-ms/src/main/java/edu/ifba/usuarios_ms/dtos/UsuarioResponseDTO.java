package edu.ifba.usuarios_ms.dtos;

import java.util.List;

import edu.ifba.usuarios_ms.models.Usuario;
import io.swagger.v3.oas.annotations.media.Schema;

public record UsuarioResponseDTO(
    @Schema(name = "id", example = "1")Long id, 
    @Schema(name = "nome", example = "Claudio da Silva")String nome, 
    @Schema(name = "email", example = "claudio@email.com")String email, 
    @Schema(name = "roles", description = "Lista de papéis atribuídos ao usuário", 
    implementation = RoleDTO.class)List<RoleDTO> roles
) {
    public UsuarioResponseDTO(Usuario usuario){
        this(
            usuario.getId(), 
            usuario.getNome(), 
            usuario.getEmail(), 
            usuario.getRoles().stream().map(RoleDTO::new).toList()
        );
    }
}
