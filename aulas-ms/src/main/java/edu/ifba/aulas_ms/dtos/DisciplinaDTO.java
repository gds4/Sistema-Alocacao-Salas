package edu.ifba.aulas_ms.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

public record DisciplinaDTO( 
  @Schema(name = "id", example = "1") Long id, 
  @Schema(name = "codigo", example = "INF012") String codigo, 
  @Schema(name = "nome", example = "Programação Web") String nome 
){}