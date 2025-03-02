package edu.ifba.aulas_ms.dtos;

import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;

public record NotificacaoSalaDTO(
  @Schema(description = "Informações da sala" , implementation = SalaDTO.class) SalaDTO sala, 
  @Schema(description = "Lista de IDs dos professores associados", example = "[1, 2, 3]") Set<Long> professorIds
) {}
