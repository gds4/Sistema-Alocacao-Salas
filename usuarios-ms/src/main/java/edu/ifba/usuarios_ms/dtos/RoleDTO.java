package edu.ifba.usuarios_ms.dtos;

import edu.ifba.usuarios_ms.models.Role;
import io.swagger.v3.oas.annotations.media.Schema;

public record RoleDTO(
    @Schema(name = "id", example = "1") Long id,
    @Schema(name = "descricao", example = "ROLE_PROFESSOR") String descricao
) {
  
  public RoleDTO(Role role) {
    this(
      role.getId(), 
      role.getDescricao()
    );
  }

}
