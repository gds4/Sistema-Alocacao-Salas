package edu.ifba.aulas_ms.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

public record TurmaDTO(
    @Schema(description = "ID da Turma", example = "1") Long id,
    @Schema(description = "Informações da Disciplina", implementation = DisciplinaDTO.class) DisciplinaDTO disciplinaDTO,
    @Schema(description = "Semestre em que a turma está sendo ministrada", example = "2025.1") String semestre,
    @Schema(description = "ID do Professor responsável pela turma", example = "12345") Long idProfessor) {
}
