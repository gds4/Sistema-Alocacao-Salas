package edu.ifba.usuarios_ms.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

public record TurmaDTO(
    @Schema(name = "id", example = "1") Long id,
    @Schema(description = "Disciplina da turma") DisciplinaDTO disciplinaDTO,
    @Schema(name = "semestre", example = "2025.1") String semestre,
    @Schema(name = "idProfessor", example = "1") Long idProfessor) {
}
