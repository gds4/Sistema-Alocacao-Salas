package edu.ifba.usuarios_ms.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

public record DadosTokenJWT(
  @Schema(
    name="token",
    example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBdWxhIGRlIFBXRUIiL..." )
    String token,
    UsuarioResponseDTO usuario
) {}
