package edu.ifba.usuarios_ms.dtos;

import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;

public record NotificacaoSalaDTO(
    @Schema(description = "Informações da sala associada à notificação.") SalaDTO sala,
    @Schema(description = "Lista de IDs dos professores que receberão a notificação.", example = "[1, 2, 3]") Set<Long> professorIds) {
}
