package edu.ifba.usuarios_ms.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

public record DisciplinaDTO(
    @Schema(name = "id", example = "1", description = "Identificador único da disciplina") Long id,
    @Schema(name = "código", example = "INF012", description = "Código da disciplina") String codigo,
    @Schema(name = "nome", example = "Matemática", description = "Nome da disciplina") String nome) {

}
