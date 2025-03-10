package edu.ifba.aulas_ms.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

public record SalaDTO(
  @Schema(name = "id", example = "1")Long id, 
  @Schema(name = "nome", example = "Lab 3")String nome
) {}
