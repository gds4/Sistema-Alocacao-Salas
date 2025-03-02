package edu.ifba.aulas_ms.dtos;

import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;

public record NotificacaoTurmaDTO(
    @Schema(description = "Informações da Turma", implementation = TurmaDTO.class) TurmaDTO turma,
    @Schema(description = "Conjunto de IDs dos Professores associados à turma", example = "[1, 2, 3]") Set<Long> professorIds) {
}
