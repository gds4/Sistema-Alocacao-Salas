package edu.ifba.usuarios_ms.dtos;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

public record NotificacaoTurmaEmailsDTO(
    @Schema(description = "Informações da turma associada à notificação.") TurmaDTO turma,
    @Schema(description = "Lista de emails dos professores que receberão a notificação.", example = "[\"professor1@example.com\", \"professor2@example.com\"]") List<String> emails) {

}
