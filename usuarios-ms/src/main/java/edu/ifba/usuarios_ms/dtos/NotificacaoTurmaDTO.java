package edu.ifba.usuarios_ms.dtos;

import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;

public record NotificacaoTurmaDTO(
    @Schema(description = "Informações da turma associada à notificação.") TurmaDTO turma,
    @Schema(description = "Lista de IDs dos professores que receberão a notificação.", example = "[101, 102, 103]") Set<Long> professorIds) {

}
